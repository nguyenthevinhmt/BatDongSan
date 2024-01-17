using AutoMapper;
using RealEstate.ApplicationService.AuthModule.Dtos;
using RealEstate.Domain.Entities;

namespace RealEstate.ApplicationService.Common
{
    public class MappingProfile : Profile
    {
        public MappingProfile() { 
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserDetailDto>().ReverseMap();
        }
    }
}
