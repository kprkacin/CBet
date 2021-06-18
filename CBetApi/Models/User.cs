using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace CBetApi.Models
{
    public class User
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        [ForeignKey(nameof(Country))]
        public int CountryId { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }

        public string HashPassword(string password) => new PasswordHasher<User>().HashPassword(this, password);


        public bool VerifyPassword(string password)
        {
            var passwordHasher = new PasswordHasher<User>();
            bool verified = false;
            var result = passwordHasher.VerifyHashedPassword(this, this.Password, password);
            if (result == PasswordVerificationResult.Success) verified = true;
            else if (result == PasswordVerificationResult.SuccessRehashNeeded) verified = true;
            else if (result == PasswordVerificationResult.Failed) verified = false;
            return verified;
        }

    }
}
