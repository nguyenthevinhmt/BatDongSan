using AutoMapper;
using RealEstate.ApplicationService.AuthModule.Dtos;
using RealEstate.ApplicationService.PostModule.Dtos;
using RealEstate.Domain.Entities;

namespace RealEstate.ApplicationService.Common
{
    public class MappingProfile : Profile
    {
        public MappingProfile() { 
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserDetailDto>().ReverseMap();
            CreateMap<Media, MediaDto>().ReverseMap();
            CreateMap<Post, PostDetailDto>().ReverseMap();
        }
    }
}
