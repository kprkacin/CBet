using System;
using System.ComponentModel.DataAnnotations;

namespace CBetApi.Models.Forms
{
    public class BetForm
    {
        [Required]
        public int CountryId { get; set; }
        [Required]
        public float Amount { get; set; }
        [Required]
        public float Coeficient { get; set; }
        [Required]
        public float Value { get; set; }


    }
}
