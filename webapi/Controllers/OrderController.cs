using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Interfaces;
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
    }
}
