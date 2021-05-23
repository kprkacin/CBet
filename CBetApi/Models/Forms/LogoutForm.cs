using System;
using System.ComponentModel.DataAnnotations;

namespace CBetApi.Models.Forms
{
    public class LogoutForm
    {
        [Required]
        public string Token { get; set; }
    }
}
