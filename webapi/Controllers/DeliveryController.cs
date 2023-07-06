using BLL.Interfaces;
using DTO.Delivery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly IDeliveryService _deliveryService;
        public DeliveryController(IDeliveryService eliveryService)
        {
            _deliveryService = eliveryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<DeliveryDTO>>> GetDeliveries()
        {
            try
            {
                return Ok(await _deliveryService.GetDeliveriesAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDTO>> GetDelivery(long id)
        {
            try
            {
                return Ok(await _deliveryService.GetDeliveryByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<DeliveryDTO>> AddDelivery(DeliveryToAddDTO deliveryToAddDTO)
        {
            try
            {
                return Ok(await _deliveryService.AddDeliveryAsync(deliveryToAddDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<DeliveryDTO>> UpdateDelivery(DeliveryDTO deliveryDTO)
        {
            try
            {
                return Ok(await _deliveryService.UpdateDeliveryAsync(deliveryDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteDelivery(long id)
        {
            try
            {
                return Ok(/*await _deliveryService.DeleteDeliveryAsync(id)*/);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
