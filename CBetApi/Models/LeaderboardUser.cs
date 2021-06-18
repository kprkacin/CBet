using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace CBetApi.Models
{
    public class LeaderboardUser
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Username { get; set; }
        [ForeignKey(nameof(Country))]
        public int CountryId { get; set; }
        public int SuccessfulBets { get; set; }
        public float WinAmount { get; set; }
        public float BetAmount { get; set; }

    }
}
