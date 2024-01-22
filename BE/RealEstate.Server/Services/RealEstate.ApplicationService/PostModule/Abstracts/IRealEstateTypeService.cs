using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.PostModule.Dtos;

namespace RealEstate.ApplicationService.PostModule.Abstracts
{
    public interface IRealEstateTypeService
    {
        /// <summary>
        /// Thêm mới loại bất động sản
        /// </summary>
        /// <param name="input"></param>
        void Create(CreateRealEstateTypeDto input);
        /// <summary>
        /// Danh sách loại bất động sản
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PagingResult<RealEstateTypeDto> FindAll(PagingRequestBaseDto input);
        /// <summary>
        /// Cập nhật loại bất động sản
        /// </summary>
        /// <param name="input"></param>
        void Update(UpdateRealEstateTypeDto input);
        /// <summary>
        /// Xóa loại bất động sản
        /// </summary>
        /// <param name="id"></param>
        void Delete(int id);
    }
}
