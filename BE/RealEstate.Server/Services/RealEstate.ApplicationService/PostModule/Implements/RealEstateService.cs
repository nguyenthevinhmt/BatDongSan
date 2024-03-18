using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Crypto.Digests;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.Common;
using RealEstate.ApplicationService.PostModule.Abstracts;
using RealEstate.ApplicationService.PostModule.Dtos;
using RealEstate.Domain.Entities;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.CustomException;
using RealEstate.Utils.Linq;

namespace RealEstate.ApplicationService.PostModule.Implements
{
    public class RealEstateService : ServiceBase, IRealEstateTypeService
    {
        public RealEstateService(ILogger<RealEstateService> logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
        }

        public void Create(CreateRealEstateTypeDto input)
        {
            var newRealEstateType = new RealEstateType()
            {
                Name = input.Name,
            };
            _dbContext.RealEstateTypes.Add(newRealEstateType);
            _dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            var finded = _dbContext.RealEstateTypes.FirstOrDefault(x => x.Id == id) ?? throw new UserFriendlyException(ErrorCode.RealEstateTypeNotFound);
            finded.Deleted = true;
            _dbContext.SaveChanges();
        }

        public PagingResult<RealEstateTypeDto> FindAll(PagingRequestBaseDto input)
        {
            var query = _dbContext.RealEstateTypes.Where(c => !c.Deleted)
                                                  .Select(c => new RealEstateTypeDto
                                                    {
                                                      Id = c.Id,
                                                      Name = c.Name,
                                                      CreateAt = c.CreatedDate,
                                                      ModifiedAt = c.ModifiedDate,
                                                      ModifierBy = c.ModifiedBy
                                                    });
            var result = new PagingResult<RealEstateTypeDto>()
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

        public void Update(UpdateRealEstateTypeDto input)
        {
            var finded = _dbContext.RealEstateTypes.FirstOrDefault(c => c.Id == input.Id)
                ?? throw new UserFriendlyException(ErrorCode.RealEstateTypeNotFound);
            finded.Name = input.Name;
            _dbContext.SaveChanges();
        }
    }
}
