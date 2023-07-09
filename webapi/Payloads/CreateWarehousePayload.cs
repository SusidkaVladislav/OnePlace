using System.ComponentModel.DataAnnotations;

namespace webapi.Payloads
{
    public class CreateWarehousePayload
    {
        [Required]
        public int Id { get; set; }

        [MinLength(3)]
        public string Name { get; set; }
    }
}
