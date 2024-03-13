namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class UpdatePaymentStatusDto
    {
        public int Id { get; set; }
        public int Options {  get; set; }
        public int LifeTime {  get; set; }
        public DateTime PostStartDate { get; set; }
    }
}
