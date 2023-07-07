using BLL.Interfaces;
using DTO.Sale;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class SaleService : ISaleService
    {
        public async Task<SaleDTO> AddSaleAsync(SaleToAddDTO saleToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteSaleAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<SaleDTO> GetSaleByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<SaleDTO>> GetSalesAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<SaleDTO> UpdateSaleAsync(SaleDTO saleDTO)
        {
            throw new NotImplementedException();
        }
    }
}
