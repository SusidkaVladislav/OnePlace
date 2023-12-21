using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OnePlace.BLL.Utilities;
using OnePlace.BOL.OrderDTO;
using OnePlace.DAL;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using OnePlace.DAL.Enums;
using Stripe;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripeWebhook : ControllerBase
    {
        const string endpointSecret = "whsec_5d8f27de5b23728865985cd0d1d91647bab64cc3db38e1fd1dc7f73b30d926bf";

        private readonly ILogger<StripeWebhook> _logger;
        private IHttpContextAccessor _httpContextAccessor;
        private readonly IUnitOfWork _unitOfWork;

        public StripeWebhook(ILogger<StripeWebhook> logger,
            IHttpContextAccessor httpContextAccessor,
              IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> Index()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = EventUtility.ConstructEvent(
                    json,
                    Request.Headers["Stripe-Signature"],
                    endpointSecret,
                    throwOnApiVersionMismatch: false
                );

                //Якщо оплата пройшла успішно
                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    //Звідси йде запит на створення замовлення 
                    var session = (Stripe.Checkout.Session)stripeEvent.Data.Object;
                    var metadata = session.Metadata;

                    var order = JsonConvert.DeserializeObject<OrderCreateDTO>(metadata["Order"]);

                    string userId;
                    bool isUserId = metadata.TryGetValue("UserId", out userId);
                    
                    await CreateOrder(order, isUserId? Int32.Parse(userId) : null);
                }

                else
                {
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }

                return Ok();
            }
            catch (StripeException e)
            {
                _logger.LogInformation(e.Message);
                return BadRequest();
            }
        }
        
        private async Task<int> CreateOrder(OrderCreateDTO createOrderDTO, int? userId)
        {
            Order newOrder = new Order
            {
                Date = DateTime.Now,
                DeliveryInfo = createOrderDTO.Department,
                Name = createOrderDTO.Name,
                PhoneNumber = createOrderDTO.PhoneNumber,
                Surname = createOrderDTO.Surname,
                PaymentStatus = PaymentStatus.Approved,
                State = OrderState.Registered,
                PaymentMethod = OnePlace.DAL.Enums.PaymentMethod.CardPayment,
                Comment = createOrderDTO.Comment,
                UserId = userId is not null ? userId.Value : null,
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
    }
}
