using System.Threading.Tasks;
using CBetApi.Models.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using CBetApi.Services;
using CBetApi.Helpers;

namespace CBetApi.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly UserService _userService;

        public AuthController(AuthService authService, UserService userService)
        {
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn(LoginForm options)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            var token = _authService.Authenticate(options.Email, options.Password);

            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized();
            }

            var user = _userService.FindUserByEmailAsync(options.Email).Result;

            return Ok(new { user.Id, user.FirstName, user.LastName, user.Username, user.Email, user.CountryId, user.ThirdParty, token });
        }
        [HttpPost("google")]
        public async Task<IActionResult> Google(GoogleForm options)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }
            var userByEmail = _userService.FindUserByEmailAsync(options.Email).Result;
            if (userByEmail != null)
            {
                var emailToken = new TokenHelper().GenerateToken(userByEmail.Id, userByEmail.Email);
                return Ok(new { userByEmail.Id, userByEmail.FirstName, userByEmail.LastName, userByEmail.Username, userByEmail.Email, userByEmail.CountryId, userByEmail.ThirdParty, token = emailToken });


            }

            var newUser = await _userService.CreateThirdParty(options);
            var token = new TokenHelper().GenerateToken(newUser.Id, newUser.Email);





            return Ok(new { newUser.Id, newUser.FirstName, newUser.LastName, newUser.Username, newUser.Email, newUser.CountryId, newUser.ThirdParty, token });
        }

    }
}
