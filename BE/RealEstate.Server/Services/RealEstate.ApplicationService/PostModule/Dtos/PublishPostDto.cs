using RealEstate.ApplicationBase.Common.Validations;
using RealEstate.Utils.ConstantVariables.Post;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class PublishPostDto
    {
        public int Id { get; set; }
        //public DateTime PostEndDate {get; set;}
        /// <summary>
        ///Số ngày đăng
        /// </summary>
        public int LifeTime {  get; set; }
        [IntegerRange(AllowableValues = new int[] { PostOptions.NORMAL, PostOptions.SILVER, PostOptions.GOLD, PostOptions.DIAMOND })]
        public int Options { get; set;}
        public string WalletNumber { get; set; } = null!;
        public DateTime PostEndDate { get; set; }
    }
}
