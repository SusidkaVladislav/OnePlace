using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Order
{
    public class OrderDTO
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public int OrderNumber { get; set; }
        public string OrderState { get; set; } = "";
        public long DeliveryId { get; set; }
        public string Comment { get; set; } = "";
        public DateTime Date { get; set; }
    }
}
