using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Entities
{
    public class Role : IdentityRole<int>
    {
        public Role() { }
        public Role(string name) : this() { this.Name = name; }
    }
}
