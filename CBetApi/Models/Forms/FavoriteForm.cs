using System;
using System.ComponentModel.DataAnnotations;

namespace CBetApi.Models.Forms
{
    public class FavoriteForm
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int FavoritedUserId { get; set; }
    }
}
