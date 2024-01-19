﻿using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.VariantTypes;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Asn1.Crmf;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.Common;
using RealEstate.ApplicationService.PostModule.Abstracts;
using RealEstate.ApplicationService.PostModule.Dtos;
using RealEstate.Domain.Entities;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.CustomException;
using RealEstate.Utils.Linq;
using SixLabors.ImageSharp;
using System.Text.Json;

namespace RealEstate.ApplicationService.PostModule.Implements
{
    public class PostService : ServiceBase, IPostService
    {
        public PostService(ILogger logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
        }

        public void CreatePost(CreatePostDto input)
        {
            var currentUserId = _httpContext.GetCurrentUserId();
            _logger.LogInformation($"{nameof(CreatePost)}: input: {JsonSerializer.Serialize(input)}, userId = {currentUserId}");
            var transaction = _dbContext.Database.BeginTransaction();
            var newPost = new Post()
            {
                Title = input.Title,
                Description = input.Description,
                Province = input.Province,
                Distinct = input.Distinct,
                Ward = input.Ward,
                Street = input.Street,
                DetailAddress = input.DetailAddress,
                Area = input.Area,
                Price = input.Price,
                RentalObject = input.RentalObject,
                YoutubeLink = input.YoutubeLink,
                PostTypeId = input.PostTypeId,
                RealEstateTypeId = input.RealEstateTypeId,
                Status = input.Status,
            };

            var post = _dbContext.Posts.Add(newPost).Entity;
            _dbContext.SaveChanges();
            var listMedia = input.ListMedia;
            if (listMedia != null)
            {
                foreach ( var media in listMedia )
                {
                    var imageMedia = new Media()
                    {
                        Name = media.Name,
                        Description = media.Description,
                        MediaUrl = media.MediaUrl,
                        PostId = post.Id
                    };
                    _dbContext.Medias.Add(imageMedia);
                }
            }
            _dbContext.SaveChanges();
            transaction.Commit();
        }

        public void Delete(int id)
        {
            _logger.LogInformation($"{nameof(Delete)}: id : {id}");
            var post = _dbContext.Posts.FirstOrDefault(c => !c.Deleted && c.Id == id) ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            _dbContext.SaveChanges();
        }

        public PagingResult<PostDto> FindAllPost(PostPagingRequestDto input)
        {
            _logger.LogInformation($"{nameof(FindAllPost)}: input: {JsonSerializer.Serialize(input)}");
            var query = from post in _dbContext.Posts
                        join media in _dbContext.Medias on post.Id equals media.PostId
                        where !post.Deleted && !media.Deleted
                                && (input.Keyword == null || post.Title.ToLower().Contains(input.Keyword.ToLower()))
                                && (post.PostTypeId == input.PostType)
                                && (post.RealEstateTypeId == input.RealEstateType)
                        select new PostDto
                        {
                            Title = post.Title,
                            ApproveAt = DateTime.Now,
                            ApproveBy = post.ApproveBy,
                            Area = post.Area,
                            Description = post.Description,
                            DetailAddress = post.DetailAddress,
                            Distinct = post.Distinct,
                            Id = post.Id,
                            PostTypeId = post.PostTypeId,
                            Price = post.Price,
                            Province = post.Province,
                            RealEstateTypeId = post.RealEstateTypeId,
                            RentalObject = post.RentalObject,
                            Status = post.Status,
                            Street = post.Street,
                            UserId = post.UserId,
                            Ward = post.Ward,
                            YoutubeLink = post.YoutubeLink,
                            CreatedBy = post.CreatedBy,
                            CreatedDate = post.CreatedDate,
                            ModifiedBy = post.ModifiedBy,
                            ModifiedDate = post.ModifiedDate,
                        };
            var result = new PagingResult<PostDto>()
            {
                TotalItems = query.Count(),
            };
            query = query.OrderDynamic(input.Sort);
            if (input.PageSize != -1)
            {
                query = query.Skip(input.PageSize).Take(input.PageSize);
            }
            result.Items = query;
            return result;
        }

        public PostDetailDto FindById(int id)
        {
            _logger.LogInformation($"{nameof(FindById)}: id : {id}");
            var findPost = (from post in _dbContext.Posts
                            join image in _dbContext.Medias on post.Id equals image.PostId
                            where post.Id == id && !post.Deleted && image.Deleted
                            select new PostDetailDto
                            {
                                Id = post.Id,
                                Title = post.Title,
                                Area = post.Area,
                                Description = post.Description,
                                DetailAddress = post.DetailAddress,
                                Distinct = post.Distinct,
                                PostTypeId = post.PostTypeId,
                                Price = post.Price,
                                Province = post.Province,
                                RealEstateTypeId = post.RealEstateTypeId,
                                RentalObject = post.RentalObject,
                                Status = post.Status,
                                Street = post.Street,
                                Ward = post.Ward,
                                YoutubeLink = post.YoutubeLink,
                                Medias = post.Medias ?? new List<Media>(),
                            }).FirstOrDefault() ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            return _mapper.Map<PostDetailDto>(findPost);
        }

        public PostDetailDto Update(UpdatePostDto input)
        {
            _logger.LogInformation($"{nameof(Update)}: input: {JsonSerializer.Serialize(input)}");
            var findPost = (from post in _dbContext.Posts
                            join image in _dbContext.Medias on post.Id equals image.PostId
                            where post.Id == input.Id && !post.Deleted && image.Deleted
                            select new PostDetailDto
                            {
                                Id = post.Id,
                                Title = post.Title,
                                Area = post.Area,
                                Description = post.Description,
                                DetailAddress = post.DetailAddress,
                                Distinct = post.Distinct,
                                PostTypeId = post.PostTypeId,
                                Price = post.Price,
                                Province = post.Province,
                                RealEstateTypeId = post.RealEstateTypeId,
                                RentalObject = post.RentalObject,
                                Status = post.Status,
                                Street = post.Street,
                                Ward = post.Ward,
                                YoutubeLink = post.YoutubeLink,
                                Medias = post.Medias ?? new List<Media>(),
                            }).FirstOrDefault() ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            findPost.Title = input.Title;
            findPost.Area = input.Area;
            findPost.Ward = input.Ward;
            findPost.Distinct = input.Distinct;
            findPost.Province = input.Province;
            findPost.Street = input.Street;
            findPost.Description = input.Description;
            findPost.Price = input.Price;
            findPost.RentalObject = input.RentalObject;
            findPost.YoutubeLink = input.YoutubeLink;
            findPost.PostTypeId = input.PostTypeId;
            findPost.RealEstateTypeId = input.RealEstateTypeId;
            findPost.Medias = input.ListMedia;
            _dbContext.SaveChanges();
            return findPost;
        }
    }
}