using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Primitives;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Utilities;
using OnePlace.BOL.Enums;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.OrderDTO;
using OnePlace.BOL.OrderPayload;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Text;

namespace OnePlace.BLL.Services
{
    /// <summary>
    /// Сервіс відповідає за роботу з замовленнями
    /// </summary>
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private IHttpContextAccessor _httpContextAccessor;

        public OrderService(IMapper mapper, 
            IUnitOfWork unitOfWork,
             UserManager<User> userManager,
            SignInManager<User> signInManager,
            IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<int> CreateOrder(OrderCreatePayload orderCreate)
        {
            OrderCreateDTO createOrderDTO = _mapper.Map<OrderCreateDTO>(orderCreate);

            if (createOrderDTO == null) throw new ArgumentNullException(nameof(createOrderDTO) + " is null");

            if (createOrderDTO.DeliveryMethod.Equals(DeliveryMethods.Courier))
            {
                if (string.IsNullOrEmpty(createOrderDTO.Street) ||
                    createOrderDTO.HouseNumber is null ||
                    createOrderDTO.HouseNumber <= 0 ||
                    createOrderDTO.FlatNumber is null ||
                    createOrderDTO.FlatNumber <= 0)
                    throw new ArgumentException("не всі дані по доставці передані");
            }
            else if(createOrderDTO.DeliveryMethod.Equals(DeliveryMethods.Department) ||
                createOrderDTO.DeliveryMethod.Equals(DeliveryMethods.Postomat))
                    if(string.IsNullOrEmpty(createOrderDTO.Department))
                        throw new ArgumentException("не всі дані по доставці передані");


            var isProduct = await _unitOfWork.Products.FindAsync(p => p.Id == createOrderDTO.ProductId);

            //Перевірка чи існує товар з переданим Id 
            //if (isProduct.Any())
            //{
            //    var wareHouse = await _unitOfWork.WarehouseProducts
            //        .FindAsync(w => w.ProductId == isProduct.First().Id);

            //    //Перевірка чи достатня кількість товару на складі
            //    if (wareHouse.Any())
            //    {
            //        if(wareHouse.First().Quantity == 0) 
            //            throw new BusinessException("товару немає в наявності");
            //        if (wareHouse.First().Quantity < createOrderDTO.QuantityOfProducts)
            //            createOrderDTO.QuantityOfProducts = wareHouse.First().Quantity;

            //        wareHouse.First().Quantity -= createOrderDTO.QuantityOfProducts;

            //        //_unitOfWork.WarehouseProducts.Update(wareHouse.First());
            //    }
            //    else
            //        new ArgumentNullException("warehouse null");
            //}
            //else
            //    throw new ArgumentNullException(nameof(Product) + " is null");

            //Поточний користувач
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);

            if (user is null) throw new NotFoundException(nameof(User) + " not exists");

            /*Delivery delivery = new Delivery
            {
                City = createOrderDTO.City,
                CityRef = createOrderDTO.CityRef,
                DeliveryMethod = (DAL.Enums.DeliveryMethod)createOrderDTO.DeliveryMethod,
                ServiceName = (DAL.Enums.DeliveryCompanies)createOrderDTO.ServiceName
            };

            //Створення основних даних про доставку
            _unitOfWork.Deliveries.Create(delivery);*/

            
            //Тут треба побавитися зі Stripe

            Order order = new Order
            {
                 Comment= createOrderDTO.Comment,
                 Date = DateTime.Now,
                 DeliveryInfo = ExtractDeliveryInfo(createOrderDTO),
                 State = DAL.Enums.OrderState.Registered,
                 UserId = user.Id,
                 PaymentIntentId = "from stripe session",
                 SessionId = "from stripe session"
            };

            //Створення замовлення
            _unitOfWork.Orders.Create(order);

            await _unitOfWork.SaveAsync();

            OrderProduct orderProduct = new OrderProduct
            {
                OrderId = order.Id,
                ProductId = createOrderDTO.ProductId,
                Quantity = createOrderDTO.QuantityOfProducts
            };

            //Додати замовлення в БД
            _unitOfWork.OrderProducts.Create(orderProduct);
            await _unitOfWork.SaveAsync();

            return order.Id;
            /*if (createOrderDTO.ServiceName.Equals(DeliveryCompanies.NowaPoshta))
            {
                if(createOrderDTO.DeliveryMethod.Equals(DeliveryMethods.Department) ||
                    createOrderDTO.DeliveryMethod.Equals(DeliveryMethods.Postomat)){
                    DepartmentDelivery departmentDelivery = new DepartmentDelivery
                    {
                        DeliveryId= delivery.Id,
                        Department = createOrderDTO.Department
                    };
                }
            }
            else if(createOrderDTO.ServiceName.Equals(DeliveryCompanies.UkrPoshta))
            {
                //УкрПошта не може доставляти через поштомат
                if (createOrderDTO.DeliveryMethod.Equals(DeliveryMethods.Postomat))
                    throw new BusinessException(DeliveryCompanies.UkrPoshta + " has not " +
                        DeliveryMethods.Postomat + "s");


            }*/


            //throw new NotImplementedException();

        }

        private string ExtractDeliveryInfo(OrderCreateDTO orderCreateDTO)
        {
            if (orderCreateDTO.DeliveryMethod.Equals(DeliveryMethods.SelfDelivery))
                return DeliveryMethods.SelfDelivery.ToString();

            StringBuilder deliveryInfo = new StringBuilder();

            deliveryInfo.Append(orderCreateDTO.ServiceName.ToString());
            deliveryInfo.Append(". ");
            deliveryInfo.Append(orderCreateDTO.City);
            deliveryInfo.Append(", ");

            if (orderCreateDTO.DeliveryMethod.Equals(DeliveryMethods.Courier))
            {
                deliveryInfo.Append(orderCreateDTO.Street);
                deliveryInfo.Append(", ");
                deliveryInfo.Append(orderCreateDTO.HouseNumber);
                deliveryInfo.Append('/');
                deliveryInfo.Append(orderCreateDTO.FlatNumber);
                
            }
            else
            {
                deliveryInfo.Append(orderCreateDTO.Department);
            }
            return deliveryInfo.ToString(); 
        }

        public Task<int> DeleteOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<List<OrderDetails>> FilterProduct(OrderSearchParams filters)
        {
            throw new NotImplementedException();
        }

        public Task<OrderDetails> GetOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateOrder(OrderPayload order)
        {
            throw new NotImplementedException();
        }
    }
}
