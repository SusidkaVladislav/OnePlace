using BLL.Interfaces;
using DTO.Order;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            try
            {
                return Ok(await _orderService.GetOrdersAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrder(long id)
        {
            try
            {
                return Ok(await _orderService.GetOrderByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<OrderDTO>> AddOrder(OrderToAddDTO orderToAddDTO)
        {
            try
            {
                return Ok(await _orderService.AddOrderAsync(orderToAddDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<OrderDTO>> UpdateOrder(OrderDTO orderDTO)
        {
            try
            {
                return Ok(await _orderService.UpdateOrderAsync(orderDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult<OrderDTO>> DeleteOrder(long id)
        {
            try
            {
                return Ok(/*await _orderService.DeleteOrderAsync(id)*/);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
