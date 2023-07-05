using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Entities
{
    internal class Order
    {
        public int Id { get; set; }
        public int OrderNumber { get; set; }
        public string Comment { get; set; }
        public string State { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int DeliveryId { get; set; }
        public Delivery Delivery { get; set; }
    }
}
