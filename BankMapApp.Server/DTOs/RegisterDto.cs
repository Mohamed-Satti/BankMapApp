using BankMapApp.Server.Models;
using System.ComponentModel.DataAnnotations;

public class RegisterDto //Must be available ONLY for admins
{
    [Required]
    public required string FirstName { get; set; }

    [Required]
    public required string LastName { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }
    [Required]
    public required string Password { get; set; }
    [Required]
    public string Role { get; set; }

}
