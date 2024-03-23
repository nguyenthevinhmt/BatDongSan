using RealEstate.ApplicationBase.Common.Validations;
using RealEstate.Utils.ConstantVariables.Post;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class UpdatePostStatusDto
    {
        public int Id { get; set; }
        /// <summary>
        /// Trạng thái
        /// </summary>
        [IntegerRange(AllowableValues = new int[] { PostStatuses.POSTED, PostStatuses.REMOVED, PostStatuses.PENDING, PostStatuses.CANCEL })]
        public int PostStatus {  get; set; }
    }
}
