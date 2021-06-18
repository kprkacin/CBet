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
                PhoneNumber = model.PhoneNumber,
                CountryId = model.CountryId,
                Password = new User().HashPassword(model.Password),
            };

            var newUser = await _db.AddAsync(user);
            await _db.SaveChangesAsync();

            return newUser.Entity;
        }
        public async Task<User> UpdateAsync(UpdateForm model, User user)
        {
            if (model.FirstName != null)
            {
                user.FirstName = model.FirstName;
            }
            if (model.LastName != null)
            {
                user.LastName = model.LastName;
            }
            if (model.Username != null)
            {
                user.Username = model.Username;
            }
            if (model.Email != null)
            {
                user.Email = model.Email;
            }
            if (model.CountryId != null)
            {
                user.CountryId = model.CountryId ?? default(int);
            }
            if (model.PhoneNumber != null)
            {
                user.PhoneNumber = model.PhoneNumber;
            }



            _db.Attach(user);
            await _db.SaveChangesAsync();

            return user;
        }

        public async Task<User> FindUserByEmailAsync(string email)
        {
            return await _db.Users.FirstOrDefaultAsync(e => e.Email == email);
        }

        public async Task<User> FindUserByIdAsync(int id)
        {
            return await _db.Users.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task UpdateUserPassword(User user, string newPassword)
        {
            user.Password = new User().HashPassword(newPassword);
            _db.Attach(user);
            await _db.SaveChangesAsync();
        }

    }
}
