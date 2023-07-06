using DTO.Description;
using DTO.Picture;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IPictureService
    {
        Task<List<PictureDTO>> GetPicturesAsync();
        Task<PictureDTO> GetPictureByIdAsync(long id);
        Task<PictureDTO> AddPictureAsync(PictureToAdd pictureToAdd);
        Task<PictureDTO> UpdatePictureAsync(PictureDTO pictureDTO);
        Task DeletePictureAsync(long id);
    }
}
