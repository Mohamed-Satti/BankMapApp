using BankMapApp.Server.Models;
using System.Threading.Tasks;

public interface IAuthService
{
    Task<User> AuthenticateUser(string email, string password);
    Task<User> RegisterUser(User user, string plainPassword);
    string GenerateJwtToken(User user);
}