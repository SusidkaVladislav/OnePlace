using Microsoft.AspNetCore.Identity;

namespace OnePlace.DAL.Entities
{
    public class Role : IdentityRole<int>
    {
        public Role()
        {}

        public Role(string name) : this() { this.Name = name; }
    }

}
