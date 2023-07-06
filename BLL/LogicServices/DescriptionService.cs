using BLL.Interfaces;
using DTO.Description;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class DescriptionService : IDescriptionService
    {
        //Dependency injection of repository


        public async Task<DescriptionDTO> AddDescriptionAsync(DescriptionToAddDTO descriptionToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteDescriptionAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<DescriptionDTO>> GetDescriptionsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<DescriptionDTO> GetDescriptionByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<DescriptionDTO> UpdateDescriptionAsync(DescriptionDTO descriptionDTO)
        {
            throw new NotImplementedException();
        }
    }
}
