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
    public class LeaderboardService
    {
        private readonly CBetApiDbContext _db;
        private readonly BetService _betService;

        public LeaderboardService(CBetApiDbContext db, BetService betService)
        {
            _db = db;
            _betService = betService;
        }

        public async Task<List<LeaderboardUser>> GetBest()
        {

            var leaderboard = new List<LeaderboardUser>();
            var users = _db.Users.ToList();
            foreach (var user in users)
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

            return leaderboard.OrderByDescending(e => e.SuccessfulBets).ToList();
        }


    }
}
