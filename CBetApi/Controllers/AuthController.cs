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

            return Ok(new { user.Id, user.FirstName, user.LastName, user.Username, user.Email, token });
        }

    }
}
