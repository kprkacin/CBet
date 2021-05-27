
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CBetApi.Services;
using CBetApi.Models.Forms;
using CBetApi.Helpers;

namespace CBetApi.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly UserService _userService;

        public UserController(AuthService authService, UserService userService)
        {
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterForm options)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            var emailUser = await _userService.FindUserByEmailAsync(options.Email);

            if (emailUser != null)
            {
                return BadRequest(new { message = "User with this email already exists." });
            }


            var newUser = await _userService.CreateAsync(options);
            var token = new TokenHelper().GenerateToken(newUser.Id, newUser.Email);


            return Ok(new { newUser.Id, newUser.FirstName, newUser.LastName, newUser.Username, newUser.Email, token });
        }
    }
}
