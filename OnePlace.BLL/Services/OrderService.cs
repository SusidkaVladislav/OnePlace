using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Utilities;
using OnePlace.BLL.Validators;
using OnePlace.BOL.Enums;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.OrderDTO;
using OnePlace.BOL.OrderPayload;
using OnePlace.DAL;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Enums;
using OnePlace.DAL.Interfaces;
using System.Diagnostics;
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

        /// <summary>
        /// Оформити замовлення
        /// </summary>
        /// <param name="orderCreate"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public async Task<int> CreateOrder(OrderCreatePayload orderCreate)
        {
            OrderCreateDTO createOrderDTO = _mapper.Map<OrderCreateDTO>(orderCreate);

            if (createOrderDTO == null) throw new ArgumentNullException(nameof(createOrderDTO) + " is null");

            #region Valid order information
            OrderValidation validation = new OrderValidation(_unitOfWork);

            try
            {
                await validation.OrderedProductsValid(createOrderDTO.Products);
            }
            catch (ArgumentNullException ex)
            {
                throw ex;
            }
            catch (BusinessException ex)
            {
                throw ex;
            }

            //Авторизований користувач
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);

            #endregion

            Order newOrder = new Order 
            { 
                Date = DateTime.Now,
                DeliveryInfo = ExtractDeliveryInfo(createOrderDTO),
                Name = createOrderDTO.Name,
                PhoneNumber = createOrderDTO.PhoneNumber,
                Surname = createOrderDTO.Surname,
                PaymentStatus = DAL.Enums.PaymentStatus.Pending,
                State = DAL.Enums.OrderState.Registered,
                PaymentMethod = _mapper.Map<DAL.Enums.PaymentMethod>(createOrderDTO.PaymentMethod),
                Comment = createOrderDTO.Comment,
                UserId = user is null?  null : user.Id
            };

            if (!_unitOfWork.Orders.GetAllAsync().Result.Any())
                newOrder.Number = Constants.MIN_NUMBER_FOR_ORDER;
            else
                newOrder.Number = await _unitOfWork.Orders.GetLastNumberAsync() + 1;

            _unitOfWork.Orders.Create(newOrder);
            await _unitOfWork.SaveAsync();

            foreach (var product in createOrderDTO.Products)
            {
                var sale = _unitOfWork.Sales.FindAsync(s => s.ProductId == product.ProductId).Result.FirstOrDefault();

                ProductColor productColor = await _unitOfWork.ProductColors.GetAsync(new CompositeKey
                {
                    Column1 = product.ProductId,
                    Column2 = product.ColorId
                });

                OrderProduct orderProduct = new OrderProduct
                {
                    OrderId = newOrder.Id,
                    ProductId = product.ProductId,
                    ColorId= product.ColorId,
                    Quantity = product.Quantity
                };

                //Наклaдання знижки
                if(sale is not null)
                    //Ціна зі знижкою (обрахунок знижки)
                    orderProduct.Price = productColor.Price - (productColor.Price * sale.DiscountPercent / 100);
                else
                    //Звичайна ціна
                    orderProduct.Price = productColor.Price;

                productColor.Quantity -= product.Quantity;

                _unitOfWork.ProductColors.Update(productColor);
                _unitOfWork.OrderProducts.Create(orderProduct); 
            }
            await _unitOfWork.SaveAsync();


            return newOrder.Id;
        }

        /// <summary>
        /// Повертає всі дедалі замовлення
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public async Task<OrderDetails> GetOrder(int orderId)
        {
            Order order = await _unitOfWork.Orders.GetAsync(orderId);
            if(order is null)
                throw new ArgumentNullException(nameof(order) + " is null");

            OrderDetails orderDetails = new OrderDetails
            {
                Id = orderId,
                Date = order.Date,
                Comment = order.Comment,
                DeliveryInfo = order.DeliveryInfo,
                Number= order.Number,
                OrderState = order.State.ToString(),
                PaymentMethod = order.PaymentMethod.ToString(),
                PaymentStatus = order.PaymentStatus.ToString(),
                PhoneNumber= order.PhoneNumber,
                UserId= order.UserId,
                UserInitials = order.Name + " " + order.Surname,
                Email = order.User is not null? order.User.Email : null
            };

                #region Products
            var productsOrder = await _unitOfWork.OrderProducts.FindAsync(o => o.OrderId == orderId);
            foreach (var product in productsOrder)
            {

                //Підтягнути титульну картинку товару
                var picture = await _unitOfWork.ProductPictures.FindAsync(pp=>pp.ProductId == product.ProductId
                && pp.IsTitle == true);

                OrderedProduct orderedProduct = new OrderedProduct
                {
                    Quantity = product.Quantity,
                    Picture = picture.Select(p => p.Picture.Address).FirstOrDefault(),
                    Price = product.Price //Ціна вже зі знижкою
                };

                orderDetails.TotalPrice += product.Price;

                orderDetails.Products.Add(orderedProduct);
            }
            #endregion

            #region User
            if (orderDetails.UserId is not null)
            {
                User user = await _unitOfWork.Users.GetAsync(orderId);
                if(user is not null)
                {
                    orderDetails.Email = user.Email;
                }
            }
            #endregion

            return orderDetails;
        }

        /// <summary>
        /// Змінити статус оплати
        /// </summary>
        /// <param name="orderId"></param>
        /// <param name="paymentStatus"></param>
        /// <returns></returns>
        /// <exception cref="BusinessException"></exception>
        public async Task<int> ChangePaymentStatus(int orderId, BOL.Enums.PaymentStatus paymentStatus)
        {
            Order order = await _unitOfWork.Orders.GetAsync(orderId);
            if (order is not null)
            {
                order.PaymentStatus = _mapper.Map<DAL.Enums.PaymentStatus>(paymentStatus);
                _unitOfWork.Orders.Update(order);
                await _unitOfWork.SaveAsync();
                return order.Id;
            }
            else
                throw new BusinessException("no such order");
        }

        /// <summary>
        /// Змінити статус замовлення
        /// </summary>
        /// <param name="orderId"></param>
        /// <param name="orderState"></param>
        /// <returns></returns>
        /// <exception cref="BusinessException"></exception>
        public async Task<int> ChangeOrderState(int orderId, BOL.Enums.OrderState orderState)
        {
            Order order = await _unitOfWork.Orders.GetAsync(orderId);
            if (order is not null)
            {
                order.State = _mapper.Map<DAL.Enums.OrderState>(orderState);
                
                _unitOfWork.Orders.Update(order);
                await _unitOfWork.SaveAsync();
                
                return order.Id;
            }
            else
                throw new BusinessException("no such order");
        }

        /// <summary>
        /// Фільтрувати замовлення за певними ознаками
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public async Task<List<OrderListModel>> FilterOrders(OrderSearchParams filters)
        {
            var orders = await _unitOfWork.Orders.Filter(_mapper.Map<DAL.SearchParams.OrderSearchParams>(filters));
        
            List<OrderListModel> orderList= new List<OrderListModel>();
            foreach (var order in orders.Items)
            {
                OrderListModel orderListModel = new OrderListModel
                {
                    Id = order.Id,
                    Initials = order.Name + " " + order.Surname,
                    OrderNumber = order.Number,
                    OrderStatus = order.State.ToString(),
                    PaymentStatus = order.PaymentStatus.ToString()
                };

                //Підрахунок повної суми цін продуктів з кожного замовлення
                var productsOrder = await _unitOfWork.OrderProducts.FindAsync(o => o.OrderId == order.Id);
                foreach (var product in productsOrder)
                    orderListModel.TotalPrice += product.Price;

                orderList.Add(orderListModel);
            }

            return orderList;
        }
        
        //Здійснення оплати карткою
        public Task CardPay()
        {
            //Поки-що логіка не реалізована
            throw new NotImplementedException();
        }

        //Формування інформації про доставку (допоміжний метод)
        private string ExtractDeliveryInfo(OrderCreateDTO orderCreateDTO)
        {
            StringBuilder deliveryInfo = new StringBuilder();

            deliveryInfo.Append(orderCreateDTO.ServiceName.ToString());
            deliveryInfo.Append(" {" + orderCreateDTO.DeliveryMethod.ToString() + " }. ");
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

    }
}