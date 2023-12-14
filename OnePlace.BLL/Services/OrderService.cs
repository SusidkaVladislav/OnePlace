using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Utilities;
using OnePlace.BLL.Validators;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.OrderDTO;
using OnePlace.BOL.OrderPayload;
using OnePlace.BOL.ProductDTO;
using OnePlace.DAL;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using Stripe.Checkout;
using System.Security.Claims;

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
        public async Task<int> CreateCashOrder(OrderCreatePayload orderCreate)
        {
            OrderCreateDTO createOrderDTO = _mapper.Map<OrderCreateDTO>(orderCreate);

            //Потрібно виправити логіку. Перевіряти чи 

            if (createOrderDTO == null) throw new ArgumentNullException("Передано некоректні дані для створення замовлення!");

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

            var userId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");


            #endregion

            Order newOrder = new Order
            {
                Date = DateTime.Now,
                DeliveryInfo = createOrderDTO.Department,
                Name = createOrderDTO.Name,
                PhoneNumber = createOrderDTO.PhoneNumber,
                Surname = createOrderDTO.Surname,
                PaymentStatus = DAL.Enums.PaymentStatus.Pending,
                State = DAL.Enums.OrderState.Registered,
                PaymentMethod = _mapper.Map<DAL.Enums.PaymentMethod>(createOrderDTO.PaymentMethod),
                Comment = createOrderDTO.Comment,
                UserId = userId is not null ? Int32.Parse(userId.Value) : null,
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

                ProductColor productColor = await _unitOfWork.ProductColors.GetAsync(new Composite2Key
                {
                    Column1 = product.ProductId,
                    Column2 = product.ColorId
                });

                OrderProduct orderProduct = new OrderProduct
                {
                    OrderId = newOrder.Id,
                    ProductId = product.ProductId,
                    ColorId = product.ColorId,
                    Quantity = product.Quantity
                };

                //Наклaдання знижки
                if (sale is not null)
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

        public async Task<Session> CreateCardOrder(OrderCreatePayload orderCreate)
        {
            OrderCreateDTO createOrderDTO = _mapper.Map<OrderCreateDTO>(orderCreate);

            if (createOrderDTO == null) throw new ArgumentNullException("Передано некоректні дані для створення замовлення!");

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
            #endregion

            List<ProductCardPaymentInfo> products = new List<ProductCardPaymentInfo>();
            
            foreach (var product in createOrderDTO.Products)
            {
                var sale = _unitOfWork.Sales.FindAsync(s => s.ProductId == product.ProductId).Result.FirstOrDefault();
                var productName =_unitOfWork.Products.FindAsync(p=>p.Id == product.ProductId).Result.FirstOrDefault();

                ProductColor productColor = await _unitOfWork.ProductColors.GetAsync(new Composite2Key
                {
                    Column1 = product.ProductId,
                    Column2 = product.ColorId
                });
                
                //Наклaдання знижки
                if (sale is not null)
                {
                    products.Add(new ProductCardPaymentInfo
                    {
                        ProductName = productName?.Name,
                        Price = productColor.Price - (productColor.Price * sale.DiscountPercent / 100),
                        Quantity = product.Quantity
                    });
                }
                else
                {
                    products.Add(new ProductCardPaymentInfo
                    {
                        ProductName = productName?.Name,
                        Price = productColor.Price,
                        Quantity = product.Quantity
                    });
                }
            }

            var userId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");

            Session session = CardPay(products, createOrderDTO, userId);
            
            return session;
        }

        //Здійснення оплати карткою
        private Session CardPay(List<ProductCardPaymentInfo> products, OrderCreateDTO order, Claim userId)
        {
            var options = new SessionCreateOptions();

            
            options.SuccessUrl = "http://localhost:3000/";
            options.CancelUrl = "http://localhost:3000/basket";


            options.LineItems = new List<SessionLineItemOptions>();
            options.Mode = "payment";
            options.PaymentMethodTypes = new List<string> {
                            "card" };

            options.Metadata = new Dictionary<string, string>();
            options.Metadata.Add("Order", JsonConvert.SerializeObject(order));
            if(userId is not null) 
            {
                options.Metadata.Add("UserId", userId.Value.ToString());
            }


            foreach (var product in products)
            {
                var sessionListItem = new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    { 
                        UnitAmount=(long)((product.Price * product.Quantity) * 100),
                        Currency="usd",
                        ProductData=new SessionLineItemPriceDataProductDataOptions
                        {
                            Name=product.ProductName,
                        }
                    },
                    Quantity = product.Quantity
                };
                options.LineItems.Add(sessionListItem);
            }

            var service = new SessionService();
            return service.Create(options);
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
            if (order is null)
                throw new ArgumentNullException(nameof(order) + " is null");

            OrderDetails orderDetails = new OrderDetails
            {
                Id = orderId,
                Date = order.Date,
                Comment = order.Comment,
                DeliveryInfo = order.DeliveryInfo,
                Number = order.Number,
                OrderState = order.State.ToString(),
                PaymentMethod = order.PaymentMethod.ToString(),
                PaymentStatus = order.PaymentStatus.ToString(),
                //DeliveryCompany = 
                PhoneNumber = order.PhoneNumber,
                UserId = order.UserId,
                UserInitials = order.Name + " " + order.Surname,
                Email = order.User is not null ? order.User.Email : null
            };

            #region Products
            var productsOrder = await _unitOfWork.OrderProducts.FindAsync(o => o.OrderId == orderId);
            foreach (var product in productsOrder)
            {
                string productName = _unitOfWork.Products.FindAsync(p => p.Id == product.ProductId).Result.Select(p => p.Name).FirstOrDefault();
                //Підтягнути титульну картинку товару
                var picture = await _unitOfWork.ProductPictures.FindAsync(pp => pp.ProductId == product.ProductId
                && pp.IsTitle == true);

                OrderedProduct orderedProduct = new OrderedProduct
                {
                    Id = product.ProductId,
                    Name = productName,
                    Quantity = product.Quantity,
                    ColorId = product.ColorId,
                    Picture = picture.Select(p => p.Picture.Address).FirstOrDefault(),
                    Price = product.Price//Ціна вже зі знижкою
                };
                var color = await _unitOfWork.Colors.GetAsync(product.ColorId);
                orderedProduct.ColorName = color.Name;
                orderDetails.TotalPrice += product.Price * product.Quantity;

                orderDetails.Products.Add(orderedProduct);
            }
            #endregion

            #region User
            if (orderDetails.UserId is not null)
            {
                User user = await _unitOfWork.Users.GetAsync(orderId);
                if (user is not null)
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

            List<OrderListModel> orderList = new List<OrderListModel>();
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
                    orderListModel.TotalPrice += product.Price * product.Quantity;

                orderList.Add(orderListModel);
            }

            return orderList;
        }

        public async Task<List<OrderListModel>> GetOrdersByDate(DateTime? date)
        {
            List<OrderListModel> orderList = new List<OrderListModel>();
            var orders = new List<Order>();
            if (date is not null)
            {
                orders = _unitOfWork.Orders.FindAsync(o => o.Date >= date.Value.Date).Result.ToList();
            }
            else
            {
                orders = _unitOfWork.Orders.FindAsync(o => o.Date.Date >= new DateTime().Date).Result.ToList();
            }

            foreach (var order in orders)
            {
                OrderListModel orderListModel = new OrderListModel
                {
                    Id = order.Id,
                    Initials = order.Name + " " + order.Surname,
                    OrderNumber = order.Number,
                    OrderStatus = order.State.ToString(),
                    PaymentStatus = order.PaymentStatus.ToString()
                };

                var productsOrder = await _unitOfWork.OrderProducts.FindAsync(o => o.OrderId == order.Id);
                foreach (var product in productsOrder)
                    orderListModel.TotalPrice += product.Price * product.Quantity;

                orderList.Add(orderListModel);
            }

            return orderList;
        }


        public async Task<List<OrderListModel>> GetAllOrders()
        {
            List<OrderListModel> orderList = new List<OrderListModel>();

            var orders = await _unitOfWork.Orders.GetAllAsync();
            foreach (var order in orders)
            {
                OrderListModel orderListModel = new OrderListModel
                {
                    Id = order.Id,
                    Initials = order.Name + " " + order.Surname,
                    OrderNumber = order.Number,
                    OrderStatus = order.State.ToString(),
                    PaymentStatus = order.PaymentStatus.ToString()
                };

                var productsOrder = await _unitOfWork.OrderProducts.FindAsync(o => o.OrderId == order.Id);
                foreach (var product in productsOrder)
                    orderListModel.TotalPrice += product.Price * product.Quantity;

                orderList.Add(orderListModel);
            }

            return orderList;
        }

        public async Task<int> DeleteOrer(int id)
        {
            if (id <= 0)
                throw new BusinessException("Некоректне id!");
            //var order = _unitOfWork.Orders.FindAsync(o => o.Id == id).Result.FirstOrDefault();

            var order = await _unitOfWork.Orders.GetAsync(id);

            if (order is null)
                throw new BusinessException("Неіснуюче замовлення!");

            //Якщо замовлення не виконано і не оплачено, то всі товари повертаються "на склад"
            if (order.State != DAL.Enums.OrderState.Done && order.PaymentStatus != DAL.Enums.PaymentStatus.Approved)
            {
                //Повернення замовлених товарів товарів 
                foreach (var product in order.OrderProducts)
                {
                    var productColor = await _unitOfWork.ProductColors.GetAsync(
                     new Composite2Key
                     {
                         Column1 = product.ProductId,
                         Column2 = product.ColorId
                     });

                    productColor.Quantity += product.Quantity;

                    _unitOfWork.ProductColors.Update(productColor);
                }
                await _unitOfWork.SaveAsync();
            }

            await _unitOfWork.Orders.DeleteAsync(id);
            await _unitOfWork.SaveAsync();
            return id;
        }

        //Формування інформації про доставку (допоміжний метод)
        //private string ExtractDeliveryInfo(OrderCreateDTO orderCreateDTO)
        //{
        //    StringBuilder deliveryInfo = new StringBuilder();

        //    deliveryInfo.Append(orderCreateDTO.ServiceName.ToString());
        //    deliveryInfo.Append(" {" + orderCreateDTO.DeliveryMethod.ToString().TrimEnd() + "}. ");
        //    deliveryInfo.Append(orderCreateDTO.City);
        //    deliveryInfo.Append(", ");

        //    if (orderCreateDTO.DeliveryMethod.Equals(DeliveryMethods.Courier))
        //    {
        //        deliveryInfo.Append(orderCreateDTO.Street);
        //        deliveryInfo.Append(", ");
        //        deliveryInfo.Append(orderCreateDTO.HouseNumber);
        //        deliveryInfo.Append('/');
        //        deliveryInfo.Append(orderCreateDTO.FlatNumber);
        //    }
        //    else
        //    {
        //        deliveryInfo.Append(orderCreateDTO.Department);
        //    }
        //    return deliveryInfo.ToString();
        //}
    }
}