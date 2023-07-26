using OnePlace.BOL.CategoryPayload;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BLL.Interfaces
{
    public interface ICategoryService
    {
        List<CategoryToReturnPayload> GetCategories();
        CategoryToReturnPayload GetCategory(int id);
        
        // maybe here better is to return boolean
        void AddSubcategory(int parentId, CategoryCreatePayload childCategory);


    }
}
