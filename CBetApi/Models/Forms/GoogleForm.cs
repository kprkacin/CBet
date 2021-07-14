using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace CBetApi.Models.Forms
{
    public class GoogleForm
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }

        public string LastName { get; set; }

    }

}
