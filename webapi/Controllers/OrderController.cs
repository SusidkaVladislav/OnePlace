using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Utilities;
using OnePlace.BOL.Enums;
using OnePlace.BOL.OrderPayload;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder(OrderCreatePayload orderCreatePayload)
        {
            var res = await _orderService.CreateOrder(orderCreatePayload);
            return Ok(res);
        }

        [HttpGet]
        public async Task<IActionResult> GetOrder(int id)
        {
            var res = await _orderService.GetOrder(id);
            return Ok(res); 
        }

        [HttpPost("ChangePaymentStatus")]
        public async Task<IActionResult> ChangePaymentStatus([FromBody] int orderId, PaymentStatus paymentStatus)
        {
            var res = await _orderService.ChangePaymentStatus(orderId, paymentStatus);
            return Ok(res);
        }

        [HttpPost("ChangeOrderState")]
        public async Task<IActionResult> ChangeOrderState([FromBody] int orderId, OrderState orderState )
        {
            var res = await _orderService.ChangeOrderState(orderId, orderState);
            return Ok(res);
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetFilteredOrders([FromBody] OrderSearchParams orderSearchParams)
        {
            var res = await _orderService.FilterOrders(orderSearchParams);
            return Ok(res);
        }
    }
}
