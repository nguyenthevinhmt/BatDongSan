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


        // Image && File 2xxx
        FileNotFound = 2000,
        FileMaxLength = 2001,
        FileExtention = 2002,

        SysVarsIsNotConfig = 2003,
    }
}
