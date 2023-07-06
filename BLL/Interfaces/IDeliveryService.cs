using DTO.Delivery;
using DTO.Description;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IDeliveryService
    {
        Task<List<DeliveryDTO>> GetDeliveriesAsync();
        Task<DeliveryDTO> GetDeliveryByIdAsync(long id);
        Task<DeliveryDTO> AddDeliveryAsync(DeliveryToAddDTO deliveryToAdd);
        Task<DeliveryDTO> UpdateDeliveryAsync(DeliveryDTO deliveryDTO);
        Task DeleteDeliveryAsync(long id);
    }
}
