using RealEstate.ApplicationService.AuthModule.Dtos;
using RealEstate.Domain.Entities;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class PostDetailInHome : PostDetailDto
    {
        public UserDto? User { get; set; }
    }
}
