using OnePlace.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.Message
{
    public class MessageDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public string UserPictureAddress { get; set; }
        public DateTime UserRegistrationDate { get; set; }
        public string UserEmail { get; set; }
        public string UserPhoneNumber { get; set; }
        public int UserCountOfOrders { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string MessageText { get; set; }
        public DateTime Date { get; set; }
        public bool IsReplied { get; set; }
    }
}
