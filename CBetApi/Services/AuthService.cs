using System;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CBetApi.Data;
using CBetApi.Models;
using CBetApi.Helpers;
using Microsoft.IdentityModel.Tokens;

namespace CBetApi.Services
{
    public class AuthService
    {
        private readonly CBetApiDbContext _dbContext;

        public AuthService(CBetApiDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string Authenticate(string email, string password)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            if (user.VerifyPassword(password))
            {
                return new TokenHelper().GenerateToken(user.Id, user.Email);
            };
            return "";

        }

    }

}