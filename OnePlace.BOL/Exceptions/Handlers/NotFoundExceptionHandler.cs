using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.Exceptions.Handlers
{
    public class NotFoundExceptionHandler: DomainExceptionHandler<NotFoundException>
    {
        protected override int Status => StatusCodes.Status404NotFound;
    }
}
