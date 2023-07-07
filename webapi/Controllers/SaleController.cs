using BLL.Interfaces;
using DTO.Sale;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly ISaleService _saleService;
        public SaleController(ISaleService saleService)
        {
            _saleService = saleService;
        }

        [HttpGet]
        public async Task<ActionResult<List<SaleDTO>>> GetSales()
        {
            try
            {
                return Ok(await _saleService.GetSalesAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SaleDTO>> GetSale(long id)
        {
            try
            {
                return Ok(await _saleService.GetSaleByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<SaleDTO>> AddSale(SaleToAddDTO saleToAddDTO)
        {
            try
            {
                return Ok(await _saleService.AddSaleAsync(saleToAddDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<SaleDTO>> UpdateSale(SaleDTO saleDTO)
        {
            try
            {
                return Ok(await _saleService.UpdateSaleAsync(saleDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteSale(long id)
        {
            try
            {
                return Ok(/*await _saleService.DeleteSaleAsync(id)*/);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
