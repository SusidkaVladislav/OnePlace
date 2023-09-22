using AutoMapper;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Validators;
using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.CategoryPayload;
using OnePlace.BOL.Exceptions;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;

namespace OnePlace.BLL.Services
{
    /// <summary>
    /// Сервіс для роботи з категоріями
    /// </summary>
    public class CategoryService : ICategoryService
    {
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        public CategoryService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Додати нову категорію
        /// </summary>
        /// <param name="categoryPayload"></param>
        /// <returns></returns>
        /// <exception cref="NotFoundException"></exception>
        /// <exception cref="ArgumentException"></exception>
        /// <exception cref="BusinessException"></exception>
        public async Task<int> Add(CategoryCreatePayload categoryPayload)
        {
            CategoryCreateDTO categoryDTO = _mapper.Map<CategoryCreateDTO>(categoryPayload);

            CategoryValidation validation = new CategoryValidation(_unitOfWork);

            if (categoryDTO == null)
                throw new NotFoundException(nameof(CategoryCreateDTO) + " переданий об'єкт рівний null");

            if (categoryDTO.Name.Length < 2)
                throw new ArgumentException(nameof(categoryDTO.Name) + " minimum length of category name is 2");

            categoryDTO.Name = categoryDTO.Name.ToLower().Trim();

            //Перевірка фотографії категорії
            if (string.IsNullOrEmpty(categoryDTO.PictureAddress))
                throw new ArgumentException("некоректне фото категорії");

            //Назви категорій мають бути унікальними (перевіряєтсья чи є вже категорія з потрібним іменем)  
            if (!await validation.IsUnique(categoryDTO.Name)) 
                throw new BusinessException(nameof(CategoryCreateDTO) + " категорія з такою назвою вже існує");
            
            //Перевірка на наявність батьківської категорії
            if(!await validation.IsCorrectParentCategory(categoryDTO.ParentId))
                throw new NotFoundException(nameof(CategoryCreateDTO) + " неіснуюча батьківська категорія");

            if (categoryDTO.ParentId <= 0)
                categoryDTO.ParentId = null;

            //Перевірка чи батьківська категорія не містить продуктів. Якщо місить, то значить що вона є кінцевою категорієї
            //і добавити в неї нову під-категорію неможна
            //IEnumerable<Product> products = await _unitOfWork.Products.FindAsync(p=>p.Category.Id == categoryDTO.ParentId);
            //if(products.Count() > 0)
            if(await validation.IsFinalCategory(categoryDTO.ParentId))
                throw new BusinessException(nameof(CategoryCreateDTO) + " в категорію з id={" + categoryDTO.ParentId + "} " +
                    " не можна добавляти під-категорії");

            //Зберегти фотографію 
            Picture picture = new Picture
            {
                Address= categoryDTO.PictureAddress
            };
            _unitOfWork.Pictures.Create(picture);
            await _unitOfWork.SaveAsync();

            //Приведення до типу категорії Entity
            Category category = _mapper.Map<Category>(categoryDTO);
            category.PictureId = picture.Id;

            _unitOfWork.Categories.Create(category);
            
            await _unitOfWork.SaveAsync();

            return category.Id;
        }

        /// <summary>
        /// Видалити категорію
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        /// <exception cref="NotFoundException"></exception>
        /// <exception cref="BusinessException"></exception>
        /// <exception cref="Exception"></exception>
        public async Task<int> Delete(int id)
        {
            if (int.IsNegative(id) || id == 0)
                throw new ArgumentException(nameof(id) + " id can't be negative or 0");
            var category = await _unitOfWork.Categories.GetAsync(id);
            
            if (category == null)
                throw new NotFoundException(nameof(CategoryCreateDTO) + " неіснуюча категорія");
            
            if(category.ChildCategories.Count() > 0)
                throw new BusinessException("Категорію неможливо видалити, бо вона містить підкатегорії");
            if(category.Products.Count() > 0)
                throw new BusinessException("Категорію неможливо видалити, бо вона містить продукти");

            await _unitOfWork.Pictures.DeleteAsync(category.PictureId);
            await _unitOfWork.Categories.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return id;
        }

        /// <summary>
        /// Отримати всі основні категорії
        /// </summary>
        /// <returns></returns>
        public async Task<List<PureCategory>> GetCategories()
        {
            var mainCategories = await _unitOfWork.Categories.FindAsync(c=>c.ParentCategoryId == null);   
            List<PureCategory> res = _mapper.Map<List<PureCategory>>(mainCategories);
            
            return res;
        }

        /// <summary>
        /// Отримати всі підкатегорії в категорії за переданим id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        /// <exception cref="NotFoundException"></exception>
        public async Task<CategoryDetails> GetCategory(int id)
        {
            if(int.IsNegative(id) || id == 0)
                throw new ArgumentException(nameof(id) + " id can't be negative or 0");

            Category category = await _unitOfWork.Categories.GetAsync(id);

            if (category == null)
                throw new NotFoundException(id, "not found category");

            CategoryDetails details = _mapper.Map<CategoryDetails>(category);
            
            return details;
        }   

        /// <summary>
        /// Редагування назви та фотографії категорії
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="ArgumentException"></exception>
        /// <exception cref="BusinessException"></exception>
        public async Task<int> Update(CategorUpdatePayload category)
        {
            CategoryUpdateDTO categoryUpdate = _mapper.Map<CategoryUpdateDTO>(category);

            CategoryValidation validation = new CategoryValidation(_unitOfWork);

            if(categoryUpdate == null) throw new ArgumentNullException(nameof(categoryUpdate) + " null");

            if (!await validation.Exists(category.Id))
                throw new BusinessException(nameof(Category) + " not exists");

            if (categoryUpdate.Name.Length < 2)
                throw new ArgumentException(nameof(categoryUpdate.Name) + " minimum length of category name is 2");

            categoryUpdate.Name = categoryUpdate.Name.ToLower().Trim();
            
            //Перевірка фотографії категорії
            if (string.IsNullOrEmpty(categoryUpdate.PictureAddress))
                throw new ArgumentException("некоректне фото категорії");

            Category updateCategory = await _unitOfWork.Categories.GetAsync(categoryUpdate.Id);

            updateCategory.Name = categoryUpdate.Name;

            #region Update category picture
            Picture picture = _unitOfWork.Pictures.FindAsync(p => p.Id == updateCategory.PictureId)
                .Result.FirstOrDefault();
            
            if(picture != null)
            {
                picture.Address = categoryUpdate.PictureAddress;
                _unitOfWork.Pictures.Update(picture);
            }
            else
            {
                _unitOfWork.Pictures.Create(picture = new Picture
                {
                    Address= categoryUpdate.PictureAddress
                });
            }
            #endregion

            _unitOfWork.Categories.Update(updateCategory);
            await _unitOfWork.SaveAsync();
            
            return updateCategory.Id;
        }
    }
}
