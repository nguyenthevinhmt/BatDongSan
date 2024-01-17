using RealEstate.ApplicationService.EmailModule.Dtos;

namespace RealEstate.ApplicationService.EmailModule.Abstracts
{
    public interface IEmailService
    {
        Task SendEmailAsync(string email, string subject, string htmlMessage);
        Task SendMail(MailContent mailContent);
    }
}
