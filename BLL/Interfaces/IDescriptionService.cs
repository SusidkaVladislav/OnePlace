using DTO.Description;
using DTO.FirstLevelCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IDescriptionService
    {
        Task<List<DescriptionDTO>> GetDescriptionsAsync();
        Task<DescriptionDTO> GetDescriptionByIdAsync(long id);
        Task<DescriptionDTO> AddDescriptionAsync(DescriptionToAddDTO descriptionToAdd);
        Task<DescriptionDTO> UpdateDescriptionAsync(DescriptionDTO descriptionDTO);
        Task DeleteDescriptionAsync(long id);
    }
}
