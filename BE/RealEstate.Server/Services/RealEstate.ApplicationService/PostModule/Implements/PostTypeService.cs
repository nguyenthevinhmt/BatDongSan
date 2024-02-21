using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.Common;
using RealEstate.ApplicationService.PostModule.Abstracts;
using RealEstate.ApplicationService.PostModule.Dtos;
using RealEstate.Domain.Entities;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.CustomException;
using RealEstate.Utils.Linq;
using System.Text.Json;

namespace RealEstate.ApplicationService.PostModule.Implements
{
    public class PostTypeService : ServiceBase, IPostTypeService
    {
        public PostTypeService(ILogger<PostTypeService> logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
        }

        public void CreatePostType(CreatePostTypeDto input)
        {
            _logger.LogInformation($"{nameof(CreatePostType)}: input: {JsonSerializer.Serialize(input)}");
            var newPostType = new PostType()
            {
                Name = input.Name,
            };
            _dbContext.PostTypes.Add(newPostType);
            _dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _logger.LogInformation($"{nameof(Delete)}: id: {id}");
            var postType = _dbContext.PostTypes.FirstOrDefault(p => p.Id == id) ?? throw new UserFriendlyException(ErrorCode.PostTypeNotFound);
            postType.Deleted = true;
            _dbContext.SaveChanges();
        }

        public PagingResult<PostTypeDto> FindAll(PagingRequestBaseDto input)
        {
            _logger.LogInformation($"{nameof(FindAll)}: input: {JsonSerializer.Serialize(input)}");
            var query = _dbContext.PostTypes.Where(c => !c.Deleted && (input.Keyword == null || c.Name.Contains(input.Keyword.ToLower())))
                                            .Select(c => new PostTypeDto
                                            {
                                                Id = c.Id,
                                                CreateAt = c.CreatedDate,
                                                Name = c.Name,
                                                ModifiedAt = c.ModifiedDate,
                                                ModifierBy = c.ModifiedBy
                                            });
            var result = new PagingResult<PostTypeDto>()
            {
                TotalItems = query.Count()
            };
            query = query.OrderDynamic(input.Sort);
            if (input.PageSize != -1)
            {
                query = query.Skip(input.PageSize).Take(input.PageSize);
            }
            result.Items = query;
            return result;

        }
    }
}
