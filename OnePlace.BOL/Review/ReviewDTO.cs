using OnePlace.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.Review
{
    public class ReviewDTO
    {
        public int Id { get; set; }
        public int NumberOfStars { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }

        public int ProductId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string ProductPictureAddress { get; set; }

        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public string UserPictureAddress { get; set; }
        public DateTime UserRegistrationDate { get; set; }
        public string UserEmail { get; set; }
        public string UserPhoneNumber { get; set; }
        public int UserCountOfOrders { get; set; }
    }
}
