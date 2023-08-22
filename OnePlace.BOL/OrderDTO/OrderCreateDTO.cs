using OnePlace.BOL.Enums;
using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.OrderDTO
{
    public class OrderCreateDTO
    {
        public int UserId { get; set; }

        public int ProductId { get; set; }

        public string? Comment { get; set; }

        public DeliveryCompanies ServiceName { get; set; }

        [DataType(DataType.Text)]
        public string City { get; set; }

        //public string CityRef { get; set; }

        public DeliveryMethods DeliveryMethod { get; set; }

        public int QuantityOfProducts { get; set; }


        public string? Street { get; set; }

        public string? Department { get; set; }

        public int? HouseNumber { get; set; }

        public int? FlatNumber { get; set; }
    }
}