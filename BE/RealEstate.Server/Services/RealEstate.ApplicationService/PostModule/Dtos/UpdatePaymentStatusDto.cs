﻿namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class UpdatePaymentStatusDto
    {
        public int Id { get; set; }
        public string WalletNumber { get; set; } = null!;
    }
}
