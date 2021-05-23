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
    public class UserService
    {
        private readonly CBetApiDbContext _db;

        public UserService(CBetApiDbContext db)
        {
            _db = db;
        }

        public async Task<User> CreateAsync(RegisterForm model)
        {
            var user = new User()
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Username = model.Username,
                Password = new User().HashPassword(model.Password),
            };

            var newUser = await _db.AddAsync(user);
            await _db.SaveChangesAsync();

            return newUser.Entity;
        }

        public async Task<User> FindUserByEmailAsync(string email)
        {
            return await _db.Users.FirstOrDefaultAsync(e => e.Email == email);
        }

    }
}
