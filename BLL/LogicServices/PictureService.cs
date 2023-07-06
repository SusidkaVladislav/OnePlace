using BLL.Interfaces;
using DTO.Picture;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class PictureService : IPictureService
    {
        //dependency injection of repository

        public async Task<PictureDTO> AddPictureAsync(PictureToAdd pictureToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeletePictureAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<PictureDTO> GetPictureByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<PictureDTO>> GetPicturesAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<PictureDTO> UpdatePictureAsync(PictureDTO pictureDTO)
        {
            throw new NotImplementedException();
        }
    }
}
