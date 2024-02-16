namespace RealEstate.Utils.ConstantVariables.Shared
{
    public enum ErrorCode
    {

        System = 1,
        BadRequest = 400,
        Unauthorized = 401,
        NotFound = 404,
        InternalServerError = 500,

        // Authentication 1xxx
        UsernameOrPasswordIncorrect = 1000,
        UserNotFound = 1001,
        UserIsDeactive = 1002,
        UserOldPasswordIncorrect = 1003,
        UserNotHavePermission = 1004,
        UserIsExist = 1005,
        VerifiedOtpFailed = 1006,
        AccountIsNotVerifiedOtp = 1007, 
        UsernameIsExist = 1008,
        EmailIsExist = 1009,


        // Image && File 2xxx
        FileNotFound = 2000,
        FileMaxLength = 2001,
        FileExtention = 2002,

        SysVarsIsNotConfig = 2003,

        //Post
        PostNotFound = 3000,
        PostTypeNotFound = 3001,
        RealEstateTypeNotFound = 3002,

        //Wallet
        WalletNotFound = 4000,
        TransactionNotFound = 4001,
    }
}
