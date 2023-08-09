using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    public class BaseApiController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
