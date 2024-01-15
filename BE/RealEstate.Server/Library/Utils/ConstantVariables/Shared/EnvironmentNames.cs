namespace RealEstate.Utils.ConstantVariables.Shared
{
    public class EnvironmentNames
    {
        public const string Production = "Production";
        public const string Development = "Development";
        public const string DevelopmentWSL = "DevelopmentWSL";
        public const string Staging = "Staging";
        public const string DockerDev = "DockerDev";

        public static readonly string[] DevelopEnv = new string[]
        {
            Development,
            DevelopmentWSL,
            Staging,
            DockerDev
        };

        public static readonly string[] Develops = new string[]
        {
            Development,
            DevelopmentWSL,
            Staging,
        };
    }
}
