using AutoMapper;
using OnePlace.BLL.Interfaces;
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

        public async Task Add(CategoryCreatePayload childCategory)
        {
            CategoryCreateDTO categoryDTO = _mapper.Map<CategoryCreateDTO>(childCategory);

            if (categoryDTO == null)
                throw new NotFoundException(nameof(CategoryCreateDTO) + " переданий об'єкт рівний null");

            categoryDTO.Name = categoryDTO.Name.ToLower().Trim();

            //Підтягуються всі категорії з вказаним іменем
            var categories = await _unitOfWork.Categories
                .FindAsync(c => c.Name == categoryDTO.Name);
            //Назви категорій мають бути унікальними (перевіряєтсья чи є вже категорія з потрібним іменем)  
            if (categories.Select(n => n.Name).FirstOrDefault() != null)
                throw new BusinessException(nameof(CategoryCreateDTO) + " категорія з такою назвою вже існує");
            
            //Перевірка на наявність батьківської категорії
            if (categoryDTO.ParentId != null && categoryDTO.ParentId > 0)
                if (await _unitOfWork.Categories.GetAsync(categoryDTO.ParentId ?? default(int)) == null)
                    throw new NotFoundException(nameof(CategoryCreateDTO) + " неіснуюча батьківська категорія");
            if (categoryDTO.ParentId <= 0)
                categoryDTO.ParentId = null;

            //Перевірка чи батьківська категорія не містить продуктів. Якщо місить, то значить що вона є кінцевою категорієї
            //і добавити в неї нову пуд-категорію неможна
            IEnumerable<Product> products = await _unitOfWork.Products.FindAsync(p=>p.Category.Id == categoryDTO.ParentId);
            if(products.Count() > 0)
                throw new BusinessException(nameof(CategoryCreateDTO) + " дана категорія не може містити під-категорій");

            //Приведення до типу категорії Entity
            Category category = _mapper.Map<Category>(categoryDTO);

            _unitOfWork.Categories.Create(category);
            
            //Асинхронне збереження
            await _unitOfWork.SaveAsync();

            return;
        }

        public async Task<int> Delete(int id)
        {
            var category = await _unitOfWork.Categories.GetAsync(id);
            if (category == null)
                throw new NotFoundException(nameof(CategoryCreateDTO) + " неіснуюча категорія");

            //Якщо категорія має підкатегорію, то не можна видаляти
            await _unitOfWork.Categories.DeleteAsync(id);
            try
            {
                await _unitOfWork.SaveAsync();
            }
            catch (BusinessException ex)
            {
                throw new BusinessException("Категорію неможливо видалити, бо вона містить підкатегорії");
            }

            return id;
        }

        public async Task<List<CategoryDetails>> GetAll()
        {
            //Чекаю дописаного репозиторія
            var categories = await _unitOfWork.Categories.GetAllAsync();
            List<CategoryDetails> res = _mapper.Map<List<CategoryDetails>>(categories);
            return res;
        }

        public Task<CategoryDetails> Get(int id)
        {
            //Чекаю дописаного репозиторія
            throw new NotImplementedException();
        }

        public Task<int> Update(CategoryPayload category)
        {
            //Як оновлення буде організовуватися

            throw new NotImplementedException();
        }
    }
}
