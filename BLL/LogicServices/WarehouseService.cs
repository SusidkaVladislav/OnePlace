using AutoMapper;
using BLL.Interfaces;
using DTO.Warehouse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class Warehouse
    {
        public int Id { get; set; }
        public string Location { get; set; }
    }

    public class WarehouseService : IWarehouseService
    {
        //Dependency injection of the repository

        List<Warehouse> warehouseList;

        public WarehouseService()
        {
            warehouseList = new List<Warehouse>
            {
                new Warehouse{ Id = 1, Location = "loc_1"},
                new Warehouse{ Id = 2, Location = "loc_2"},
                new Warehouse{ Id = 3, Location = "loc_3"},
                new Warehouse{ Id = 4, Location = "loc_4"}
            };
        }

        public async Task<List<WarehouseDTO>> GetWarehousesAsync()
        {

            var config = new MapperConfiguration(cfg => cfg.CreateMap<Warehouse, WarehouseDTO>()
            .ForMember("WarehouseId", opt => opt.MapFrom(src => src.Id))
            .ForMember("WarehouseLocation", opt => opt.MapFrom(src => src.Location)));
            var mapper = new Mapper(config);
            List<WarehouseDTO> wares = mapper.Map<List<WarehouseDTO>>(warehouseList);
            

            return wares;
        }


        public async Task<WarehouseDTO> AddWarehouseAsync(WarehouseDTO warehouseDTO)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<WarehouseDTO, Warehouse>()
            .ForMember("Id", opt => opt.MapFrom(src => src.WarehouseId))
            .ForMember("Location", opt => opt.MapFrom(src => src.WarehouseLocation)));

            var mapper = new Mapper(config);
            Warehouse warehouse = mapper.Map<WarehouseDTO, Warehouse>(warehouseDTO);

            warehouseList.Add(warehouse);

            return warehouseDTO;
        }

        public async Task<WarehouseDTO> GetWarehouseByIdAsync(int id)
        {
            var warehouse = warehouseList.Where(w=>w.Id== id).FirstOrDefault();
            if(warehouse is null)
            {
                throw new Exception();
            }
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Warehouse, WarehouseDTO>()
                .ForMember("WarehouseId", opt => opt.MapFrom(src => src.Id))
                .ForMember("WarehouseLocation", opt => opt.MapFrom(src => src.Location)));

            var mapper = new Mapper(config);

            return mapper.Map<WarehouseDTO>(warehouse);

        }


        public async Task DeleteWarehouseAsync(int id)
        {
            Warehouse warehouse = warehouseList.Where(w => w.Id == id).FirstOrDefault();
            if(warehouse is null)
            {
                throw new Exception();
            }
            warehouseList.Remove(warehouse);

            //return кількість видаленого 

        }

        public async Task<WarehouseDTO> UpdateWarehouseAsync(WarehouseDTO warehouseForUpdate)
        {
            //Взяти з БД (привести до типу Entity)
            var warehouse = warehouseList.Where(w => w.Id == warehouseForUpdate.WarehouseId).FirstOrDefault();
        
            if(warehouse is null)
            {
                throw new Exception();
            }

            //Update

            return null;

        }
    }
}
