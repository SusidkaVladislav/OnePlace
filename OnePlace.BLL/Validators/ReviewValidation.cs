using OnePlace.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BLL.Validators
{
    public class ReviewValidation
    {
        private IUnitOfWork _unitOfWork;

        public ReviewValidation(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Повертає false, якщо відгук з переданим ідентифікатором ще не існує
        /// Повертає true, якщо відгук з переданим ідентифікатором вже існує
        /// </summary>
        public async Task<bool> Exists(int reviewId)
        {
            if (await _unitOfWork.Reviews.GetAsync(reviewId) != null)
                return true;
            return false;
        }
    }
}
