using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationBase.Common;

namespace RealEstate.ApplicationService.WalletModule.Dtos
{
    public class WalletPagingRequestDto : PagingRequestBaseDto
    {
        /// <summary>
        /// Id ví cá nhân
        /// </summary>
        [FromQuery(Name = "WalletId")] 
        
        public int WalletID { get; set; }
    }
}
