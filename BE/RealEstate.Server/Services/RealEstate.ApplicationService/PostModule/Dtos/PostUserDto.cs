using RealEstate.ApplicationService.AuthModule.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class PostUserDto : PostDto
    {
        public UserDto? User { get; set; }
    }
}
