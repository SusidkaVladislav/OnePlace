using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Services;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly DeliveryService _deliveryService;
        public DeliveryController(DeliveryService deliveryService)
        {
            _deliveryService = deliveryService;
        }
    }
}
