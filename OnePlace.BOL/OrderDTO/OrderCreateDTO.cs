using OnePlace.BOL.Enums;

namespace OnePlace.BOL.OrderDTO
{
    public class OrderCreateDTO
    {
        public string PhoneNumber { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public List<ProductOrderModelDTO> Products { get; set; }

        public string? Comment { get; set; }

        public DeliveryCompanies ServiceName { get; set; }

        public string City { get; set; }

        public DeliveryMethods DeliveryMethod { get; set; }

        public PaymentMethod PaymentMethod{ get; set; }

        public string? Street { get; set; }

        public string? Department { get; set; }

        public int? HouseNumber { get; set; }

        public int? FlatNumber { get; set; }
    }
}