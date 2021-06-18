using System;
using System.ComponentModel.DataAnnotations;

namespace CBetApi.Models.Forms
{
    public class RegisterForm
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public int CountryId { get; set; }
    }
}
