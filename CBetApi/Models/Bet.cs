using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CBetApi.Models
{
    public class Bet
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        [Required]
        public double Value { get; set; }
        [Required]
        public double Amount { get; set; }
        [ForeignKey(nameof(Country))]
        public int? CountryId { get; set; }
        public Country Country { get; set; }
        [Required]
        public float Coeficient { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime PayoutAt { get; set; }
        public string Type { get; set; }

    }
}
