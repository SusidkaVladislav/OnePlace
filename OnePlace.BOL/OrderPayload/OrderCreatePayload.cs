using OnePlace.BOL.Enums;
using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.OrderPayload
{
    public class OrderCreatePayload
    {
        [RegularExpression(@"^[0-9]*$")]
        public int? UserId { get; set; }

        [Required, DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        [Required, DataType(DataType.Text)]
        public string Name { get; set; }

        [Required, DataType(DataType.Text)]
        public string Surname { get; set; }

        /// <summary>
        /// Список товарів які будуть замовлятися
        /// </summary>
        [Required] 
        public List<ProductOrderModelPayload> Products { get; set; }

        [DataType(DataType.Text)]
        public string? Comment { get; set; }

        [Required]
        public DeliveryCompanies ServiceName { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string City { get; set; }

        [Required]
        public DeliveryMethods DeliveryMethod { get; set; }

        [DataType(DataType.Text)]
        public string? Street { get; set; }

        [DataType(DataType.Text)]
        public string? Department { get; set; }

        public int? HouseNumber { get; set; }
        
        public int? FlatNumber { get; set; }
    }
}
