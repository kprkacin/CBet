
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CBetApi.Services;
using CBetApi.Models;
using CBetApi.Models.Forms;
using CBetApi.Helpers;
using System;
using Microsoft.AspNetCore.Authorization;
using CBetApi.Data;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace CBetApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("v1/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private readonly FavoritesService _favoritesService;
        private readonly CBetApiDbContext _dbContext;


        public FavoritesController(FavoritesService favoritesService, CBetApiDbContext dbContext
)
        {
            _favoritesService = favoritesService;
            _dbContext = dbContext;

        }


        [HttpPost]
        public async Task<IActionResult> Create(FavoriteForm model)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }
            var favourite = _dbContext.Favorites.FirstOrDefaultAsync(e => e.UserId == model.UserId && e.FavoritedUserId == model.FavoritedUserId);

            if (favourite == null)
            {
                return BadRequest(new
                {
                    Message = "User already favorited."
                });
            }
            await _favoritesService.CreateFavoriteAsync(model);

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            await _favoritesService.RemoveFavoriteByIdAsync(id);


            return Ok();
        }
        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderboard()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var leaderboard = await _favoritesService.GetLeaderboardByFavourite(Int32.Parse(userId));

            return Ok(leaderboard);
        }
    }
}
