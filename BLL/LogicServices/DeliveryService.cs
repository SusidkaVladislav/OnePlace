using BLL.Interfaces;
using DTO.Delivery;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class DeliveryService : IDeliveryService
    {
        public async Task<DeliveryDTO> AddDeliveryAsync(DeliveryToAddDTO deliveryToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteDeliveryAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<DeliveryDTO>> GetDeliveriesAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<DeliveryDTO> GetDeliveryByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<DeliveryDTO> UpdateDeliveryAsync(DeliveryDTO deliveryDTO)
        {
            throw new NotImplementedException();
        }
    }
}
