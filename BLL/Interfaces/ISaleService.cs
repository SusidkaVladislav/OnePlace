using DTO.Delivery;
using DTO.Sale;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface ISaleService
    {
        Task<List<SaleDTO>> GetSalesAsync();
        Task<SaleDTO> GetSaleByIdAsync(long id);
        Task<SaleDTO> AddSaleAsync(SaleToAddDTO saleToAdd);
        Task<SaleDTO> UpdateSaleAsync(SaleDTO saleDTO);
        Task DeleteSaleAsync(long id);
    }
}
