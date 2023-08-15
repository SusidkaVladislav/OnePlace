﻿using System.ComponentModel.DataAnnotations;

namespace OnePlace.DAL.Entities.ViewModels
{
    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
