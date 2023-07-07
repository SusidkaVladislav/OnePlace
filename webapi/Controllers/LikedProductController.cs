﻿using BLL.Interfaces;
using DTO.LikedProduct;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikedProductController : ControllerBase
    {
        private readonly ILikedProductService _likedProductService;
        public LikedProductController(ILikedProductService likedProductService)
        {
            _likedProductService = likedProductService;
        }

        [HttpGet]
        public async Task<ActionResult<List<LikedProductDTO>>> GetLikedProducts()
        {
            try
            {
                return Ok(await _likedProductService.GetLikedProductsAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LikedProductDTO>> GetLikedProduct(long id)
        {
            try
            {
                return Ok(await _likedProductService.GetLikedProductByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<LikedProductDTO>> AddLikedProduct(LikedProductDTO likedProductDTO)
        {
            try
            {
                return Ok(await _likedProductService.AddLikedProductAsync(likedProductDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<LikedProductDTO>> UpdateLikedProduct(LikedProductDTO likedProductDTO)
        {
            try
            {
                return Ok(await _likedProductService.UpdateLikedProductAsync(likedProductDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteLikedProduct(long id)
        {
            try
            {
                return Ok(/*await _likedProductService.DeleteLikedProductAsync(id)*/);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}