using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CBetApi.Data;
using CBetApi.Models;
using CBetApi.Models.Forms;
using Microsoft.EntityFrameworkCore;

namespace CBetApi.Services
{
    public class FavoritesService
    {
        private readonly CBetApiDbContext _db;
        private readonly BetService _betService;

        public FavoritesService(CBetApiDbContext db, BetService betService)
        {
            _db = db;
            _betService = betService;
        }




        public async Task<Favorite> FindFavoriteByIdAsync(int id)
        {
            return await _db.Favorites.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<List<Favorite>> FindFavoritesByUserIdAsync(int userId)
        {
            return await _db.Favorites.Where(e => e.UserId == userId).ToListAsync();
        }

        public async Task RemoveFavoriteByIdAsync(int id)
        {
            var favourite = await _db.Favorites.FirstOrDefaultAsync(e => e.Id == id);
            _db.Favorites.Remove(favourite);
            await _db.SaveChangesAsync();

        }

        public async Task CreateFavoriteAsync(FavoriteForm option)
        {
            _db.Favorites.Add(new Favorite { UserId = option.UserId, FavoritedUserId = option.FavoritedUserId });
            await _db.SaveChangesAsync();

        }

        public async Task<List<LeaderboardUser>> GetLeaderboardByFavourite(int userId)
        {

            var leaderboard = new List<LeaderboardUser>();
            var users = _db.Users.ToList();
            var favorites = _db.Favorites.Where(e => e.UserId == userId);

            foreach (var user in users)
            {
                var favourite = await _db.Favorites.FirstOrDefaultAsync(e => e.FavoritedUserId == user.Id);
                if (favourite != null)
                {


                    var bets = _betService.GetBets(user.Id).Result;
                    var wins = bets.Count(bet => bet.Type == "Correct");
                    float amountBet = bets.Aggregate(0, (float acc, Bet bet) => acc + bet.Amount);
                    float amountWon = bets.Aggregate(0, (float acc, Bet bet) => bet.Type == "Correct" ? acc + bet.Payout : acc + 0);

                    leaderboard.Add(new LeaderboardUser
                    {
                        BetAmount = amountBet,
                        WinAmount = amountWon,
                        Email = user.Email,
                        SuccessfulBets = wins,
                        Username = user.Username,
                        CountryId = user.CountryId,
                        Id = user.Id,

                    });
                }
            }

            return leaderboard.OrderByDescending(e => e.SuccessfulBets).ToList();
        }



    }
}
