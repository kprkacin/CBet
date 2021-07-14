
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CBetApi.Services;
using CBetApi.Models.Forms;
using CBetApi.Helpers;
using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using CBetApi.Models;


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
        [Authorize]
        [HttpGet("active")]
        public async Task<IActionResult> Active()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return BadRequest();
            }
            var user = await _userService.FindUserByIdAsync(Int32.Parse(userId));

            return Ok(user);
        }
        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Update(UpdateForm options)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return BadRequest();
            }
            var user = await _userService.FindUserByIdAsync(Int32.Parse(userId));


            await _userService.UpdateAsync(options, user);

            return Ok(user);
        }
        [HttpPatch("password")]
        public async Task<IActionResult> UpdatePassword(UpdatePasswordForm options)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return BadRequest();
            }
            var user = await _userService.FindUserByIdAsync(Int32.Parse(userId));

            if (!user.VerifyPassword(options.OldPassword))
            {
                return BadRequest();
            }
            await _userService.UpdateUserPassword(user, options.NewPassword);

            return Ok();
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


            return Ok(new { newUser.Id, newUser.FirstName, newUser.LastName, newUser.Username, newUser.Email, newUser.ThirdParty, token });
        }
    }
}
