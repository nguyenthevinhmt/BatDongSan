namespace RealEstate.ApplicationService.WalletModule.Dtos
{
    public class WalletDto
    {
        public int Id { get; set; }
        public string WalletNumber { get; set; } = null!;
        public double Balance { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
    }
}
