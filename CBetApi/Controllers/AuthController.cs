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

        public AuthController(AuthService authService)
        {
            _authService = authService;
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



            return Ok(new { token });
        }

    }
}
