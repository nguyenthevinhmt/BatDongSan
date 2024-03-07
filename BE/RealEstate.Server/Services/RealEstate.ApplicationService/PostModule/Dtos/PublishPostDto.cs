using RealEstate.ApplicationBase.Common.Validations;
using RealEstate.Utils.ConstantVariables.Post;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class PublishPostDto
    {
        public int Id { get; set; }
        public DateTime PostEndDate {get; set;}
        [IntegerRange(AllowableValues = new int[] { PostOptions.NORMAL, PostOptions.SILVER, PostOptions.GOLD, PostOptions.DIAMOND })]
        public int Options { get; set;}
    }
}
