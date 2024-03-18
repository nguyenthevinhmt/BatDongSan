using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationBase.Common.Validations;
using RealEstate.Utils.ConstantVariables.Wallet;

namespace RealEstate.ApplicationService.WalletModule.Dtos
{
    public class WalletPagingRequestDto : PagingRequestBaseDto
    {
        /// <summary>
        /// Id ví cá nhân
        /// </summary>
        [FromQuery(Name = "WalletId")] 
        
        public int? WalletID { get; set; }
        /// <summary>
        /// Loại giao dịch
        /// </summary>
        [FromQuery(Name = "TransactionType")]
        [IntegerRange(AllowableValues = new int[] { Utils.ConstantVariables.Wallet.TransactionType.INPUT, Utils.ConstantVariables.Wallet.TransactionType.OUTPUT })]
        public int? TransactionType {  get; set; }
    }
}
