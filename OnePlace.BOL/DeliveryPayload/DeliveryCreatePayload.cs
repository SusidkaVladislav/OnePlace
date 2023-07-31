using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.DeliveryPayload
{
    public class DeliveryCreatePayload
    {
        [Required]
        public string Name { get; set; }
        
        [DataType(DataType.Url)]
        public string Picture { get; set; }
        
        [Required]
        public string Type { get; set; }
        
        [Required]
        public string City { get; set; }
        
        [Required] 
        public string Department { get; set; }
    }
}
