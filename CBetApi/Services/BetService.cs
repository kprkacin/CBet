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
        private readonly CovidDataService _covidDataService;

        public BetService(CBetApiDbContext db, CovidDataService covidDataService)
        {
            _db = db;
            _covidDataService = covidDataService;
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

        public async Task SyncBets(List<Bet> bets)
        {
            var history = await _covidDataService.GetTodaysData();
            foreach (var bet in bets)
            {

                var data = history.First(e => e.CountryId == bet.CountryId);
                if (data != null && bet.Type == null)
                {
                    var min = 0.9 * bet.Value;
                    var max = 1.1 * bet.Value;
                    if (min <= data.Value && data.Value <= max)
                    {
                        bet.Type = "Correct";
                    }
                    else
                    {
                        bet.Type = "False";
                    }
                }


            }
            _db.AttachRange(bets);
            await _db.SaveChangesAsync();

        }

        public async Task<List<Bet>> GetBets(int userId)
        {
            return await _db.Bets.Where(e => e.UserId == userId).ToListAsync<Bet>();
        }

        public async Task<List<Bet>> GetUnvalidatedBets()
        {
            return await _db.Bets.Where(e => e.Type == null).ToListAsync<Bet>();
        }
    }
}
