using BLL.Interfaces;
using DTO.Material;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialService _materialService;
        public MaterialController(IMaterialService materialService)
        {
            _materialService = materialService;
        }

        [HttpGet]
        public async Task<ActionResult<List<MaterialDTO>>> GetMaterials()
        {
            try
            {
                return Ok(await _materialService.GetMaterialsAsync());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaterialDTO>> GetMaterial(long id)
        {
            try
            {
                return Ok(await _materialService.GetMaterialByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<MaterialDTO>> AddMaterial(MaterialToAddDTO materialToAddDTO)
        {
            try
            {
                return Ok(await _materialService.AddMaterialAsync(materialToAddDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<MaterialDTO>> UpdateMaterial(MaterialDTO materialDTO)
        {
            try
            {
                return Ok(await _materialService.UpdateMaterialAsync(materialDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteMaterial(long id)
        {
            try
            {
                return Ok(/*await _materialService.DeleteMaterialAsync(id)*/);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
