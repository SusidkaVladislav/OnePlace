using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace OnePlace.BOL.Password
{
    public class PasswordUpdateDTO
    {
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
    }
}
