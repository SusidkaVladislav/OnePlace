using OnePlace.BOL.Enums;
using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.OrderPayload
{
    public class OrderCreatePayload
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int ProductId { get; set; }

        public string? Comment { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public DeliveryCompanies ServiceName { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string City { get; set; }

        //[Required]
        //public string CityRef { get; set; }

        [Required]
        public DeliveryMethods DeliveryMethod { get; set; }

        [Required]
        public int QuantityOfProducts { get; set; }

        
        public string? Street { get; set; }

        public string? Department { get; set; }

        public int? HouseNumber { get; set; }
        
        public int? FlatNumber { get; set; }
    }
}
