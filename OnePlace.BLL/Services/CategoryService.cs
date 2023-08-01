using AutoMapper;
using OnePlace.BLL.Interfaces;
using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.CategoryPayload;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.ProductDTO;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;

namespace OnePlace.BLL.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        public CategoryService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public Task Add(CategoryCreatePayload childCategory)
        {
            CategoryCreateDTO categoryDTO = _mapper.Map<CategoryCreateDTO>(childCategory);

            if (categoryDTO == null)
                throw new NotFoundException(nameof(CategoryCreateDTO) + " переданий об'єкт рівний null");

            categoryDTO.Name = categoryDTO.Name.ToLower().Trim();
            //Назви категорій мають унікальними    
            if (_unitOfWork.Categories.Find(c => c.Name == categoryDTO.Name)
                .Select(n => n.Name).FirstOrDefault() != null)
                throw new BusinessException(nameof(CategoryCreateDTO) + " категорія з такою назвою вже існує");
            //Перевірка на наявність батьківської категорії
            if (categoryDTO.ParentId != null && categoryDTO.ParentId > 0)
                if (_unitOfWork.Categories.Get(categoryDTO.ParentId ?? default(int)) == null)
                    throw new NotFoundException(nameof(CategoryCreateDTO) + " неіснуюча батьківська категорія");
            if (categoryDTO.ParentId <= 0)
                categoryDTO.ParentId = null;

            //Приведення до типу категорії Entity
            Category category = _mapper.Map<Category>(categoryDTO);

            _unitOfWork.Categories.Create(category);
            _unitOfWork.Save();

            return Task.CompletedTask;
        }

        public async Task<int> Delete(int id)
        {
            var category = _unitOfWork.Categories.Get(id);
            if (category == null)
                throw new NotFoundException(nameof(CategoryCreateDTO) + " неіснуюча категорія");

            //Якщо категорія має підкатегорію, то не можна видаляти
            _unitOfWork.Categories.Delete(id);
            try
            {
                _unitOfWork.Save();
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
            var categories = await _unitOfWork.Categories.GetAll();
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
