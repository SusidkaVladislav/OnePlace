using OnePlace.BOL.Exceptions;
using OnePlace.BOL.OrderDTO;
using OnePlace.DAL.Interfaces;

namespace OnePlace.BLL.Validators
{
    public class OrderValidation
    {
        private IUnitOfWork _unitOfWork;

        public OrderValidation(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// якщо переданий ІД користувача, то перевіряється чи існує користувач БД
        /// </summary>
        /// <param name="idUser"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="BusinessException"></exception>


        /// <summary>
        /// перевірка кожного товару на наявність в БД і співпадіеея з вказаним
        /// кольором, а також перевірка чи кількість товарів на складі не є меншою ніж
        /// вказана в замовленні кількість
        /// </summary>
        /// <param name="products"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="BusinessException"></exception>
        public async Task OrderedProductsValid(List<ProductOrderModelDTO> products)
        {
            if (products is null) throw new ArgumentNullException("Не вибрано жодного товару!");

            foreach (var product in products)
            {
                var p = _unitOfWork.ProductColors.FindAsync(pc => pc.ProductId == product.ProductId &&
                pc.ColorId == product.ColorId).Result.FirstOrDefault();

                if (p is not null)
                {
                    if (p.Quantity < product.Quantity)
                        throw new BusinessException("Товару з ID={" + product.ProductId +
                        "} та кольором ID={" + product.ColorId + "} не достатньо на складі!");
                }
                else
                    throw new BusinessException("Товару з ID={" + product.ProductId +
                        "} і кольором ID={" + product.ColorId + "} немає!");
            }
        }
    }
}
