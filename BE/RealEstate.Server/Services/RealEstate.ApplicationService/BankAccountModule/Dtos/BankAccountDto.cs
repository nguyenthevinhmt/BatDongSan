namespace RealEstate.ApplicationService.BankAccountModule.Dtos
{
    public class BankAccountDto
    {
        public int Id { get; set; }
        public string BankName { get; set; } = null!;
        public string BankCode { get; set; } = null!;
    }
}
