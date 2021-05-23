using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace CBetApi.Models.Forms
{
    public class LoginForm
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }

}
