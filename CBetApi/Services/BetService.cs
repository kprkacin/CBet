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

    public class BetService
    {
        private readonly CBetApiDbContext _db;

        public BetService(CBetApiDbContext db)
        {
            _db = db;
        }

        public async Task<Bet> CreateAsync(BetForm model, int userId)
        {
            var bet = new Bet()
            {
                Coeficient = model.Coeficient,
                CountryId = model.CountryId,
                UserId = userId,
                Value = model.Value,
                CreatedAt = DateTime.UtcNow,
                Amount = model.Amount,
                PayoutAt = DateTime.Now.AddDays(7),

            };

            var newBet = await _db.AddAsync(bet);
            await _db.SaveChangesAsync();

            return newBet.Entity;
        }
        public async Task<List<Bet>> GetBets(int userId)
        {
            return await _db.Bets.Where(e => e.UserId == userId).ToListAsync<Bet>();
        }
    }
}
