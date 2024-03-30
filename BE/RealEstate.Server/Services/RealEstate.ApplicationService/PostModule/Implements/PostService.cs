using AutoMapper;
using DocumentFormat.OpenXml.Office2013.Drawing.ChartStyle;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.VariantTypes;
using DocumentFormat.OpenXml.Vml.Spreadsheet;
using Hangfire;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.AuthModule.Dtos;
using RealEstate.ApplicationService.Common;
using RealEstate.ApplicationService.PostModule.Abstracts;
using RealEstate.ApplicationService.PostModule.Dtos;
using RealEstate.Domain.Entities;
using RealEstate.Infrastructure.Persistence;
using RealEstate.Utils.ConstantVariables.Post;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.ConstantVariables.Wallet;
using RealEstate.Utils.CustomException;
using RealEstate.Utils.Linq;
using RealEstate.Utils.Localization;
using SixLabors.ImageSharp;
using System.Runtime.InteropServices;
using System.Text.Json;
using Media = RealEstate.Domain.Entities.Media;

namespace RealEstate.ApplicationService.PostModule.Implements
{
    public class PostService : ServiceBase, IPostService
    {
        public PostService(ILogger<PostService> logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
        }
        public PostService(ILogger<PostService> logger, IHttpContextAccessor httpContext, RealEstateDbContext dbContext, LocalizationBase localize, IMapper mapper) : base(logger, httpContext, dbContext, localize, mapper)
        {
        }


        public int CreatePost(CreatePostDto input)
        {
            var currentUserId = _httpContext.GetCurrentUserId();
            _logger.LogInformation($"{nameof(CreatePost)}: input: {JsonSerializer.Serialize(input)}, userId = {currentUserId}");
            var transaction = _dbContext.Database.BeginTransaction();
            var newPost = new Post()
            {
                Title = input.Title,
                Description = input.Description,
                Province = input.Province,
                District = input.District,
                Ward = input.Ward,
                Street = input.Street,
                DetailAddress = input.DetailAddress,
                Area = input.Area,
                Price = input.Price,
                PostTypeId = input.PostTypeId,
                RealEstateTypeId = input.RealEstateTypeId,
                Status = PostStatuses.INIT,
                UserId = currentUserId,
                //PostEndDate = DateTime.Now.AddDays(input.LifeTime),
                LifeTime = input.LifeTime,
                CalculateType = input.CalculateType,
                Options = input.Options,
            };
            var post = _dbContext.Posts.Add(newPost).Entity;
            _dbContext.SaveChanges();
            var listMedia = input.ListMedia;
            if (listMedia != null)
            {
                foreach (var media in listMedia)
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
            return post.Id;
        }

        public void Delete(int id)
        {
            _logger.LogInformation($"{nameof(Delete)}: id : {id}");
            var post = _dbContext.Posts.FirstOrDefault(c => !c.Deleted && c.Id == id && (c.Status == PostStatuses.INIT || c.Status == PostStatuses.CANCEL || c.Status == PostStatuses.EXPIRED )) ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            post.Deleted = true;
            _dbContext.SaveChanges();
        }

        public PagingResult<PostDto> FindAllPost(PostPagingRequestDto input)
        {
            _logger.LogInformation($"{nameof(FindAllPost)}: input: {JsonSerializer.Serialize(input)}");
            var query = from post in _dbContext.Posts.Where(c => c.Status != PostStatuses.INIT)
                        join media in _dbContext.Medias on post.Id equals media.PostId into pm
                        from postmedia in pm.Take(1).DefaultIfEmpty()
                        where (input.Keyword == null || post.Title.ToLower().Contains(input.Keyword.ToLower()))
                                && (input.PostType == null || post.PostTypeId == input.PostType)
                                && ((input.PostStatus == null || post.Status == input.PostStatus))
                                && (input.RealEstateType == null || post.RealEstateTypeId == input.RealEstateType)
                                && !post.Deleted
                        select new PostDto
                        {
                            Title = post.Title,
                            ApproveAt = DateTime.Now,
                            ApproveBy = post.ApproveBy,
                            Area = post.Area,
                            Description = post.Description,
                            DetailAddress = post.DetailAddress,
                            District = post.District,
                            Id = post.Id,
                            PostTypeId = post.PostTypeId,
                            Price = post.Price,
                            Province = post.Province,
                            RealEstateTypeId = post.RealEstateTypeId,
                            Status = post.Status,
                            Street = post.Street,
                            UserId = post.UserId,
                            Ward = post.Ward,
                            PostEndDate = post.PostEndDate,
                            CreatedBy = post.CreatedBy,
                            CreatedDate = post.CreatedDate,
                            ModifiedBy = post.ModifiedBy,
                            ModifiedDate = post.ModifiedDate,
                            FirstImageUrl = postmedia.MediaUrl,
                        };
            var result = new PagingResult<PostDto>()
            {
                TotalItems = query.Count(),
            };
            query = query.OrderByDescending(c => c.ModifiedDate).ThenByDescending(c => c.Id);
            if (input.PageSize != -1)
            {
                query = query.Skip((input.PageNumber - 1) * input.PageSize).Take(input.PageSize);
            }
            result.Items = query;
            return result;
        }

        public PagingResult<PostDto> FindAllPostByUserId(PostPagingRequestDto input)
        {
            var currentUserId = _httpContext.GetCurrentUserId();
            _logger.LogInformation($"{nameof(FindAllPostByUserId)}: input: {JsonSerializer.Serialize(input)}, currentUserId = {currentUserId}");
            var query = from post in _dbContext.Posts
                        join media in _dbContext.Medias on post.Id equals media.PostId into pm
                        from postmedia in pm.Take(1).DefaultIfEmpty()
                        where !post.Deleted && post.CreatedBy == currentUserId
                                && (input.Keyword == null || post.Title.ToLower().Contains(input.Keyword.ToLower()))
                                && (input.PostType == null || post.PostTypeId == input.PostType)
                                && (input.RealEstateType == null || post.RealEstateTypeId == input.RealEstateType)
                                && (input.PostStatus == null || post.Status == input.PostStatus)
                        select new PostDto
                        {
                            Title = post.Title,
                            ApproveAt = DateTime.Now,
                            ApproveBy = post.ApproveBy,
                            Area = post.Area,
                            Description = post.Description,
                            DetailAddress = post.DetailAddress,
                            District = post.District,
                            Id = post.Id,
                            PostTypeId = post.PostTypeId,
                            Price = post.Price,
                            Province = post.Province,
                            RealEstateTypeId = post.RealEstateTypeId,
                            PostEndDate = post.PostEndDate,
                            Status = post.Status,
                            Street = post.Street,
                            UserId = post.UserId,
                            Ward = post.Ward,
                            CreatedBy = post.CreatedBy,
                            CreatedDate = post.CreatedDate,
                            ModifiedBy = post.ModifiedBy,
                            ModifiedDate = post.ModifiedDate,
                            FirstImageUrl = postmedia.MediaUrl,
                        };
            var result = new PagingResult<PostDto>()
            {
                TotalItems = query.Count(),
            };
            query = query.OrderByDescending(c => c.ModifiedDate).ThenByDescending(c => c.Id);
            if (input.PageSize != -1)
            {
                query = query.Skip((input.PageNumber - 1) * input.PageSize).Take(input.PageSize);
            }
            result.Items = query;
            return result;
        }

        public PostDetailDto FindById(int id)
        {
            _logger.LogInformation($"{nameof(FindById)}: id : {id}");
            var findPost = (from post in _dbContext.Posts 
                            join user in _dbContext.Users on post.UserId equals user.Id
                            join image in _dbContext.Medias on post.Id equals image.PostId into imageGroup
                            from image in imageGroup.DefaultIfEmpty()
                            where post.Id == id && !post.Deleted //&& !image.Deleted
                            select new PostDetailDto
                            {
                                Id = post.Id,
                                Title = post.Title,
                                Area = post.Area,
                                Description = post.Description,
                                DetailAddress = post.DetailAddress,
                                District = post.District,
                                PostTypeId = post.PostTypeId,
                                Price = post.Price,
                                Province = post.Province,
                                RealEstateTypeId = post.RealEstateTypeId,
                                Status = post.Status,
                                Street = post.Street,
                                Ward = post.Ward,
                                LifeTime = post.LifeTime,
                                CalculateType = post.CalculateType,
                                Options = post.Options,
                                CreatedDate = post.CreatedDate,
                                PostEndDate = post.PostEndDate,
                                UserName = user.Username,
                                UserPhoneNumber = user.PhoneNumber,
                                Medias = _mapper.Map<List<MediaDto>>(post.Medias!.Where(m => !m.Deleted).ToList() ?? new List<Media>()),
                            }).FirstOrDefault() ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            return findPost;
        }

        public PostDetailInHome FindByIdInHome(int id)
        {
            var result = (from post in _dbContext.Posts
                         join user in _dbContext.Users on post.UserId equals user.Id
                         where post.Id == id
                         select new PostDetailInHome
                         {
                             Id = post.Id,
                             Area = post.Area,
                             Description= post.Description,
                             DetailAddress= post.DetailAddress,
                             District = post.District,
                             PostTypeId = post.PostTypeId,
                             Medias = _mapper.Map<List<MediaDto>>(post.Medias ?? new List<Media>()),
                             Price = post.Price,
                             Province = post.Province,
                             RealEstateTypeId=post.RealEstateTypeId,
                             Status=post.Status,
                             Street=post.Street,
                             Ward=post.Ward,
                             Title=post.Title,
                             User = new()
                             {
                                 Id = user.Id,
                                 Username = user.Username,
                                 FullName = user.Fullname,
                                 Phone = user.PhoneNumber,
                                 Email = user.Email,
                                 AvatarUrl = user.AvatarUrl,
                             }
                         }).FirstOrDefault() ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            return result;
        }

        public void PublishPost(PublishPostDto input)
        {
            var currentUserId = _httpContext.GetCurrentUserId();
            var transactions = _dbContext.Database.BeginTransaction();
            var post = _dbContext.Posts.FirstOrDefault(p => p.Id == input.Id 
                                                            && (p.Status == PostStatuses.EXPIRED)
                                                            && !p.Deleted) ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            var wallet = _dbContext.Wallets.FirstOrDefault(c => c.WalletNumber == input.WalletNumber && c.UserId == currentUserId)
                       ?? throw new UserFriendlyException(ErrorCode.WalletNotFound);
            post.Status = PostStatuses.POSTED;
            var TotalAmount = CalculatePrice(input.Options);
            if (wallet.Balance < TotalAmount)
            {
                throw new UserFriendlyException(ErrorCode.InsufficientAccountBalance);
            }
            else
            {
                wallet.Balance -= TotalAmount;
            }
            if (post.PostEndDate.Date >= DateTime.Now.Date)
            {
                var jobId = BackgroundJob.Schedule<IPostService>(
                   x => x.ShowOffPost(post.Id),
                   post.PostEndDate
               );
                post.BackgroundJobOffShowPostId = jobId;
            }

            _dbContext.SaveChanges();

            var payloadToTransaction = new Transaction()
            {
                Amount = TotalAmount,
                Description = $"Thanh toan dang bai. So tien giao dich {TotalAmount}",
                TransactionFrom = wallet.WalletNumber,
                TransactionType = TransactionType.OUTPUT,
                TransactionNumber = DateTime.Now.ToString("yyyyMMddHHmmss"),
                TransactionTo = "Tai khoan he thong",
                WalletID = wallet.Id,
                CreateDate = DateTime.Now,
                PostId = post.Id
            };
            _dbContext.Transactions.Add(payloadToTransaction);
            transactions.Commit();
            _dbContext.SaveChanges();
        }

        [AutomaticRetry(Attempts = 6, DelaysInSeconds = new int[] { 10, 20, 20, 60, 120, 60 })]
        public void ShowOffPost(int id)
        {
            var post = _dbContext.Posts.FirstOrDefault(p => p.Id == id
                                                            && (p.Status == PostStatuses.POSTED)
                                                            && !p.Deleted) ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            post.Status = PostStatuses.EXPIRED;
            post.IsPayment = false;
            _dbContext.SaveChanges();
        }

        public PostDetailDto Update(UpdatePostDto input)
        {
            _logger.LogInformation($"{nameof(Update)}: input: {JsonSerializer.Serialize(input)}");
            var findPost = _dbContext.Posts.Include(p => p.Medias).FirstOrDefault(p => p.Id == input.Id && !p.Deleted) 
                                                            ?? throw new UserFriendlyException(ErrorCode.PostNotFound);

            findPost.Title = input.Title;
            findPost.Area = input.Area;
            findPost.Ward = input.Ward;
            findPost.District = input.District;
            findPost.Province = input.Province;
            findPost.Street = input.Street;
            findPost.Description = input.Description;
            findPost.Price = input.Price;
            findPost.PostTypeId = input.PostTypeId;
            findPost.RealEstateTypeId = input.RealEstateTypeId;

            findPost.BackgroundJobOffShowPostId = findPost.BackgroundJobOffShowPostId;
            findPost.PostEndDate = findPost.PostEndDate;

            foreach (var media in input.ListMedia)
            {
                var checkMedia = findPost.Medias?.FirstOrDefault(c => c.Id == media.Id && !c.Deleted);
                if (checkMedia != null)
                {
                    checkMedia.Name = media.Name;
                    checkMedia.Description = media.Description;
                    checkMedia.MediaUrl = media.MediaUrl;
                }
                else
                {
                    var imageMedia = new Media()
                    {
                        Name = media.Name,
                        Description = media.Description,
                        MediaUrl = media.MediaUrl,
                        PostId = findPost.Id
                    };
                    _dbContext.Medias.Add(imageMedia);
                }
            }

            _dbContext.SaveChanges();
            return new()
            {
                Id = findPost.Id,
                Area = findPost.Area,
                CalculateType = findPost.CalculateType,
                Description = findPost.Description,
                DetailAddress = findPost.DetailAddress,
                District = findPost.District,
                LifeTime = findPost.LifeTime,
                Options = findPost.Options,
                PostTypeId = findPost.PostTypeId,
                Price = findPost.Price,
                Province = findPost.Province,
                RealEstateTypeId = findPost.RealEstateTypeId,
                Street = findPost.Street,
                Title = findPost.Title,
                Ward = findPost.Ward,
                Medias = input.ListMedia
            };
        }

        public void UpdateStatus(UpdatePostStatusDto input)
        {
            var currentUserId = _httpContext.GetCurrentUserId();
            _logger.LogInformation($"{nameof(UpdateStatus)}: userId: {currentUserId} input: {JsonSerializer.Serialize(input)}");
            var findPost = _dbContext.Posts.FirstOrDefault(c => c.Id == input.Id) ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            findPost.Status = input.PostStatus;
            if (input.PostStatus == PostStatuses.POSTED)
            {
                findPost.ApproveAt = DateTime.Now;
                findPost.ApproveBy = currentUserId;
            }
            _dbContext.SaveChanges();
        }
        public void ApprovePost(int id)
        {
            var currentUserId = _httpContext.GetCurrentUserId();
            var post = _dbContext.Posts.FirstOrDefault(p => p.Status == PostStatuses.PENDING && p.Id == id && !p.Deleted) ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            post.ApproveAt = DateTime.Now;
            post.ApproveBy = currentUserId;
            post.Status = PostStatuses.UNPOSTED;

            if (post.PostStartDate.Date >= DateTime.Now.Date)
            {
                var jobId = BackgroundJob.Schedule<IPostService>(
                   x => x.ShowOnPost(post.Id),
                   post.PostStartDate
                );
                post.BackgroundJobOnShowPostId = jobId;
            }
            if (post.PostEndDate.Date <= DateTime.Now.Date)
            {
                var jobId = BackgroundJob.Schedule<IPostService>(
                x => x.ShowOffPost(post.Id),
                    post.PostEndDate
                );
                post.BackgroundJobOffShowPostId = jobId;
            }
            _dbContext.SaveChanges();
        }
        public void RequestApprovePost(int id)
        {
            var post = _dbContext.Posts.FirstOrDefault(p => p.Status == PostStatuses.INIT && p.Id == id && !p.Deleted) ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            post.Status = PostStatuses.PENDING;
            _dbContext.SaveChanges();
        }
        private double CalculatePrice(int options)
        {
            var price = 0.0;
            if (options == PostOptions.NORMAL)
            {
                price = PostOptionPrices.NORMAL;
            }
            else if (options == PostOptions.SILVER)
            {
                price = PostOptionPrices.SILVER;
            }
            else if (options == PostOptions.GOLD)
            {
                price = PostOptionPrices.GOLD;
            }
            else if (options == PostOptions.DIAMOND)
            {
                price = PostOptionPrices.DIAMOND;
            }
            return price;

        }

        public void UpdatePaymentStatus(UpdatePaymentStatusDto input)
        {
            var currentUserId = _httpContext.GetCurrentUserId();
            var transactions = _dbContext.Database.BeginTransaction();
            var post = _dbContext.Posts.FirstOrDefault(p => p.Id == input.Id && !p.Deleted && p.Status == PostStatuses.INIT)
                            ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            post.IsPayment = true;
            post.Options = input.Options;
            post.LifeTime = input.LifeTime;
            post.PostStartDate = input.PostStartDate;
            post.PostEndDate = input.PostStartDate.AddDays(post.LifeTime);
            post.Status = PostStatuses.PENDING;
            _dbContext.SaveChanges();

            var wallet = _dbContext.Wallets.FirstOrDefault(c => c.UserId == currentUserId)
                        ?? throw new UserFriendlyException(ErrorCode.WalletNotFound);
            var price = CalculatePrice(post.Options);
            var TotalAmount = post.LifeTime * price;
            if (wallet.Balance < TotalAmount)
            {
                throw new UserFriendlyException(ErrorCode.InsufficientAccountBalance);
            }
            else
            {
                wallet.Balance = wallet.Balance - TotalAmount;
            }
            _dbContext.SaveChanges();

            var payloadToTransaction = new Transaction()
            {
                Amount = TotalAmount,
                Description = $"Thanh toan dang bai. So tien giao dich {TotalAmount}",
                TransactionFrom = wallet.WalletNumber,
                TransactionType = TransactionType.OUTPUT,
                TransactionNumber = DateTime.Now.ToString("yyyyMMddHHmmss"),
                TransactionTo = "Tai khoan he thong",
                WalletID = wallet.Id,
                CreateDate = DateTime.Now,
                PostId = post.Id
            };
            _dbContext.Transactions.Add(payloadToTransaction);
            transactions.Commit();
            _dbContext.SaveChanges();

        }

        public void ShowOnPost(int id)
        {
            var post = _dbContext.Posts.FirstOrDefault(p => p.Id == id
                                                           && (p.Status != PostStatuses.POSTED)
                                                           && !p.Deleted) ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            post.Status = PostStatuses.POSTED;
            _dbContext.SaveChanges();
        }

        public PagingResult<PostDto> FindAllPublic(PostPagingRequestDto input)
        {
            _logger.LogInformation($"{nameof(FindAllPublic)}: input: {JsonSerializer.Serialize(input)}");
            var query = from post in _dbContext.Posts
                        join media in _dbContext.Medias on post.Id equals media.PostId into pm
                        from postmedia in pm.Take(1).DefaultIfEmpty()
                        where (input.Keyword == null || post.Title.ToLower().Contains(input.Keyword.ToLower()))
                                && (input.PostType == null || post.PostTypeId == input.PostType)
                                && (input.PostStatus == null || post.Status == input.PostStatus)
                                && (input.RealEstateType == null || post.RealEstateTypeId == input.RealEstateType)
                                && !post.Deleted 
                                && post.Status == PostStatuses.POSTED && post.IsPayment
                        select new PostDto
                        {
                            Title = post.Title,
                            ApproveAt = DateTime.Now,
                            ApproveBy = post.ApproveBy,
                            Area = post.Area,
                            Description = post.Description,
                            DetailAddress = post.DetailAddress,
                            District = post.District,
                            Id = post.Id,
                            PostTypeId = post.PostTypeId,
                            Price = post.Price,
                            Province = post.Province,
                            RealEstateTypeId = post.RealEstateTypeId,
                            Status = post.Status,
                            Street = post.Street,
                            UserId = post.UserId,
                            Ward = post.Ward,
                            PostEndDate = post.PostEndDate,
                            CreatedBy = post.CreatedBy,
                            CreatedDate = post.CreatedDate,
                            ModifiedBy = post.ModifiedBy,
                            ModifiedDate = post.ModifiedDate,
                            FirstImageUrl = postmedia.MediaUrl,
                            Options = post.Options,
                            PostStartDate = post.PostStartDate,
                        };
            var result = new PagingResult<PostDto>()
            {
                TotalItems = query.Count(),
            };
            query = query.OrderByDescending(c => c.CreatedDate).ThenByDescending(c => c.Options);
            if (input.PageSize != -1)
            {
                query = query.Skip((input.PageNumber - 1) * input.PageSize).Take(input.PageSize);
            }
            result.Items = query;
            return result;
        }

        public void deleteImage(int id)
        {
            var image = _dbContext.Medias.FirstOrDefault(c => c.Id == id && !c.Deleted) ?? throw new UserFriendlyException(ErrorCode.FileNotFound);
            image.Deleted = true;
            _dbContext.SaveChanges();
        }

        public PagingResult<PostDto> FindAllPostNewest(PagingRequestBaseDto input)
        {
            _logger.LogInformation($"{nameof(FindAllPostNewest)}: input: {JsonSerializer.Serialize(input)}");
            var query = from post in _dbContext.Posts
                        join media in _dbContext.Medias on post.Id equals media.PostId into pm
                        from postmedia in pm.Take(1).DefaultIfEmpty()
                        where (input.Keyword == null || post.Title.ToLower().Contains(input.Keyword.ToLower()))
                                && !post.Deleted
                                && post.Status == PostStatuses.POSTED && post.IsPayment
                        select new PostDto
                        {
                            Title = post.Title,
                            ApproveAt = DateTime.Now,
                            ApproveBy = post.ApproveBy,
                            Area = post.Area,
                            Description = post.Description,
                            DetailAddress = post.DetailAddress,
                            District = post.District,
                            Id = post.Id,
                            PostTypeId = post.PostTypeId,
                            Price = post.Price,
                            Province = post.Province,
                            RealEstateTypeId = post.RealEstateTypeId,
                            Status = post.Status,
                            Street = post.Street,
                            UserId = post.UserId,
                            Ward = post.Ward,
                            PostEndDate = post.PostEndDate,
                            CreatedBy = post.CreatedBy,
                            CreatedDate = post.CreatedDate,
                            ModifiedBy = post.ModifiedBy,
                            ModifiedDate = post.ModifiedDate,
                            FirstImageUrl = postmedia.MediaUrl,
                            Options = post.Options,
                            PostStartDate = post.PostStartDate,
                        };
            var result = new PagingResult<PostDto>()
            {
                TotalItems = query.Count(),
            };
            query = query.OrderByDescending(c => c.PostStartDate).ThenByDescending(c => c.ApproveAt);
            if (input.PageSize != -1)
            {
                query = query.Skip((input.PageNumber - 1) * input.PageSize).Take(input.PageSize);
            }
            result.Items = query;
            return result;
        }

        public PagingResult<PostDto> FindAllPostByProvince(PagingRequestBaseDto input)
        {
            _logger.LogInformation($"{nameof(FindAllPostByProvince)}: input: {JsonSerializer.Serialize(input)}");
            var query = from post in _dbContext.Posts
                        join media in _dbContext.Medias on post.Id equals media.PostId into pm
                        from postmedia in pm.Take(1).DefaultIfEmpty()
                        where (input.Keyword == null || post.Province.ToLower().Contains(input.Keyword.ToLower()))
                                && !post.Deleted
                                && post.Status == PostStatuses.POSTED && post.IsPayment
                        select new PostDto
                        {
                            Title = post.Title,
                            ApproveAt = DateTime.Now,
                            ApproveBy = post.ApproveBy,
                            Area = post.Area,
                            Description = post.Description,
                            DetailAddress = post.DetailAddress,
                            District = post.District,
                            Id = post.Id,
                            PostTypeId = post.PostTypeId,
                            Price = post.Price,
                            Province = post.Province,
                            RealEstateTypeId = post.RealEstateTypeId,
                            Status = post.Status,
                            Street = post.Street,
                            UserId = post.UserId,
                            Ward = post.Ward,
                            PostEndDate = post.PostEndDate,
                            CreatedBy = post.CreatedBy,
                            CreatedDate = post.CreatedDate,
                            ModifiedBy = post.ModifiedBy,
                            ModifiedDate = post.ModifiedDate,
                            FirstImageUrl = postmedia.MediaUrl,
                            Options = post.Options,
                            PostStartDate = post.PostStartDate,
                        };
            var result = new PagingResult<PostDto>()
            {
                TotalItems = query.Count(),
            };
            query = query.OrderByDescending(c => c.ModifiedDate);
            if (input.PageSize != -1)
            {
                query = query.Skip((input.PageNumber - 1) * input.PageSize).Take(input.PageSize);
            }
            result.Items = query;
            return result;
        }

        public PagingResult<PostDto> SearchPost(SearchPostRequestDto input)
        {
            _logger.LogInformation($"{nameof(SearchPost)}: input: {JsonSerializer.Serialize(input)}");
            var query = from post in _dbContext.Posts
                        join media in _dbContext.Medias on post.Id equals media.PostId into pm
                        from postmedia in pm.Take(1).DefaultIfEmpty()
                        where (input.Keyword == null || post.Title.ToLower().Contains(input.Keyword.ToLower()))
                                && !post.Deleted
                                && (input.Area == null || post.Area == input.Area)
                                && (input.RealEstateType == null || post.RealEstateTypeId == input.RealEstateType)
                                && (input.PostType == null || post.PostTypeId == input.PostType)
                                && (input.Province == null || post.Province.ToLower().Contains(input.Province.ToLower()))
                                && (input.Province == null || post.Province.ToLower().Contains(input.Province.ToLower()))
                                && post.Status == PostStatuses.POSTED && post.IsPayment
                        select new PostDto
                        {
                            Title = post.Title,
                            ApproveAt = DateTime.Now,
                            ApproveBy = post.ApproveBy,
                            Area = post.Area,
                            Description = post.Description,
                            DetailAddress = post.DetailAddress,
                            District = post.District,
                            Id = post.Id,
                            PostTypeId = post.PostTypeId,
                            Price = post.Price,
                            Province = post.Province,
                            RealEstateTypeId = post.RealEstateTypeId,
                            Status = post.Status,
                            Street = post.Street,
                            UserId = post.UserId,
                            Ward = post.Ward,
                            PostEndDate = post.PostEndDate,
                            CreatedBy = post.CreatedBy,
                            CreatedDate = post.CreatedDate,
                            ModifiedBy = post.ModifiedBy,
                            ModifiedDate = post.ModifiedDate,
                            FirstImageUrl = postmedia.MediaUrl,
                            Options = post.Options,
                            PostStartDate = post.PostStartDate,
                        };
            var result = new PagingResult<PostDto>()
            {
                TotalItems = query.Count(),
            };
            query = query.OrderByDescending(c => c.ModifiedDate);
            if (input.PageSize != -1)
            {
                query = query.Skip((input.PageNumber - 1) * input.PageSize).Take(input.PageSize);
            }
            result.Items = query;
            return result;
        }
        public void CancelRequest(int id)
        {
            var post = _dbContext.Posts.FirstOrDefault(c => c.Id == id) 
                        ?? throw new UserFriendlyException(ErrorCode.PostNotFound);
            post.Status = PostStatuses.CANCEL;
            post.IsPayment = false;
            post.BackgroundJobOnShowPostId = null;
            post.BackgroundJobOffShowPostId = null;
            var transaction = _dbContext.Transactions.FirstOrDefault(c => c.PostId == id) 
                        ?? throw new UserFriendlyException(ErrorCode.TransactionNotFound);
            var wallet = _dbContext.Wallets.FirstOrDefault(c => c.UserId == post.UserId)
                        ?? throw new UserFriendlyException(ErrorCode.WalletNotFound);
            wallet.Balance = wallet.Balance + transaction.Amount;
            
            var withDrawTransaction = new Transaction()
            {
                Amount = transaction.Amount,
                Description = $"Thanh toan huy duyet bai. So tien giao dich {transaction.Amount}",
                TransactionFrom = "Tai khoan he thong",
                TransactionType = TransactionType.INPUT,
                TransactionNumber = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                TransactionTo = wallet.WalletNumber,
                WalletID = wallet.Id,
                CreateDate = DateTime.Now,
                PostId = post.Id
            };
            _dbContext.Transactions.Add(withDrawTransaction);
            _dbContext.SaveChanges();
        }

        public PagingResult<PostDto> FindAllSalePostByUserCreated(PagingRequestByPostTypeDto input)
        {
            _logger.LogInformation($"{nameof(FindAllSalePostByUserCreated)}: input: {JsonSerializer.Serialize(input)}");
            var query = from post in _dbContext.Posts
                        join media in _dbContext.Medias on post.Id equals media.PostId into pm
                        from postmedia in pm.Take(1).DefaultIfEmpty()
                        where post.CreatedBy == input.UserId 
                              && !post.Deleted
                              && post.PostTypeId == input.PostType
                              && post.Status == PostStatuses.POSTED && post.IsPayment
                        select new PostDto
                        {
                            Title = post.Title,
                            ApproveAt = DateTime.Now,
                            ApproveBy = post.ApproveBy,
                            Area = post.Area,
                            Description = post.Description,
                            DetailAddress = post.DetailAddress,
                            District = post.District,
                            Id = post.Id,
                            PostTypeId = post.PostTypeId,
                            Price = post.Price,
                            Province = post.Province,
                            RealEstateTypeId = post.RealEstateTypeId,
                            Status = post.Status,
                            Street = post.Street,
                            UserId = post.UserId,
                            Ward = post.Ward,
                            PostEndDate = post.PostEndDate,
                            CreatedBy = post.CreatedBy,
                            CreatedDate = post.CreatedDate,
                            ModifiedBy = post.ModifiedBy,
                            ModifiedDate = post.ModifiedDate,
                            FirstImageUrl = postmedia.MediaUrl,
                            Options = post.Options,
                            PostStartDate = post.PostStartDate,
                        };
            var result = new PagingResult<PostDto>()
            {
                TotalItems = query.Count(),
            };
            query = query.OrderByDescending(c => c.ModifiedDate);
            if (input.PageSize != -1)
            {
                query = query.Skip((input.PageNumber - 1) * input.PageSize).Take(input.PageSize);
            }
            result.Items = query;
            return result;
        }

        public PagingResult<PostDto> FindAllRentPostByUserCreated(PagingRequestByPostTypeDto input)
        {
            _logger.LogInformation($"{nameof(FindAllRentPostByUserCreated)}: input: {JsonSerializer.Serialize(input)}");
            var query = from post in _dbContext.Posts
                        join media in _dbContext.Medias on post.Id equals media.PostId into pm
                        from postmedia in pm.Take(1).DefaultIfEmpty()
                        where post.CreatedBy == input.UserId
                              && post.PostTypeId == input.PostType
                              && !post.Deleted
                              && post.Status == PostStatuses.POSTED && post.IsPayment
                        select new PostDto
                        {
                            Title = post.Title,
                            ApproveAt = DateTime.Now,
                            ApproveBy = post.ApproveBy,
                            Area = post.Area,
                            Description = post.Description,
                            DetailAddress = post.DetailAddress,
                            District = post.District,
                            Id = post.Id,
                            PostTypeId = post.PostTypeId,
                            Price = post.Price,
                            Province = post.Province,
                            RealEstateTypeId = post.RealEstateTypeId,
                            Status = post.Status,
                            Street = post.Street,
                            UserId = post.UserId,
                            Ward = post.Ward,
                            PostEndDate = post.PostEndDate,
                            CreatedBy = post.CreatedBy,
                            CreatedDate = post.CreatedDate,
                            ModifiedBy = post.ModifiedBy,
                            ModifiedDate = post.ModifiedDate,
                            FirstImageUrl = postmedia.MediaUrl,
                            Options = post.Options,
                            PostStartDate = post.PostStartDate,
                        };
            var result = new PagingResult<PostDto>()
            {
                TotalItems = query.Count(),
            };
            query = query.OrderByDescending(c => c.ModifiedDate);
            if (input.PageSize != -1)
            {
                query = query.Skip((input.PageNumber - 1) * input.PageSize).Take(input.PageSize);
            }
            result.Items = query;
            return result;
        }
    }
}
