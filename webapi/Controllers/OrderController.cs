using Microsoft.AspNetCore.Authorization;
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

        [HttpPost("createOrder")]
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
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> ChangePaymentStatus(OrderChangePaymentStatePayload paymentStatePayload)
        {
            var res = await _orderService.ChangePaymentStatus(paymentStatePayload.orderId, paymentStatePayload.paymentStatus);
            return Ok(res);
        }

        [HttpPost("ChangeOrderState")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> ChangeOrderState(OrderChangeStatePayload orderChangeState)
        {
            var res = await _orderService.ChangeOrderState(orderChangeState.orderId, orderChangeState.orderState);
            return Ok(res);
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetFilteredOrders([FromBody] OrderSearchParams orderSearchParams)
        {
            var res = await _orderService.FilterOrders(orderSearchParams);
            return Ok(res);
        }

        [HttpGet("getByDate")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetOrdersByDate(DateTime? date)
        {
            var res = await _orderService.GetOrdersByDate(date);
            return Ok(res);
        }

        [HttpGet("getAll")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAllOrders()
        {
            var res = await _orderService.GetAllOrders();
            return Ok(res);
        }

        [HttpDelete("deleteOrder")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var res = await _orderService.DeleteOrer(id);
            return Ok(res);
        }
    }
}
