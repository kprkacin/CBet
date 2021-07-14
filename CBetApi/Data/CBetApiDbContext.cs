using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using System.Globalization;
using CBetApi.Models;
using System;
using System.Text.Json.Serialization;
namespace CBetApi.Data
{
    public class CBetApiDbContext : DbContext
    {
        public CBetApiDbContext(DbContextOptions<CBetApiDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Bet> Bets { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Country> Countries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            var countryList = Country.countryList;
            for (int i = 0; i < countryList.Count(); i++)
            {
                modelBuilder.Entity<Country>().HasData(new Country { Id = i + 1, Code = countryList[i].Code, Name = countryList[i].Name });

            }


        }
    }
}