using AutoMapper;
using BLL.LogicServices;
using DTO.Warehouse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Mappings
{
    public class WarehouseProfile: Profile
    {
        public WarehouseProfile()
        {
            CreateMap<Warehouse, WarehouseDTO>(MemberList.Source);
            CreateMap<WarehouseDTO, WarehouseDTO>(MemberList.None);
        }
    }
}
