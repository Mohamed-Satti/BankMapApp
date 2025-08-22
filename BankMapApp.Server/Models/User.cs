using System.ComponentModel.DataAnnotations;

namespace BankMapApp.Server.Models
{
    public enum UserRole {
        Admin,
        User
    }
    public class User
    {
        internal readonly object GeographicObjects;

        //public Guid Id { get; set;}
        public int Id { get; set; } 

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } //Serve as username

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public UserRole Role { get; set; } //Admin or User 


        //public required string Username { get; set; }

    }
}