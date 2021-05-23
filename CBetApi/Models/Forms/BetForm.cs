using System;
using System.ComponentModel.DataAnnotations;

namespace CBetApi.Models.Forms
{
    public class BetForm
    {
        [Required]
        public int CountryCode { get; set; }
        [Required]
        public float Amount { get; set; }
        [Required]
        public float Coeficient { get; set; }

    }
}
