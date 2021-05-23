
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CBetApi.Services;
using CBetApi.Models.Forms;
using CBetApi.Helpers;
using System;
using Microsoft.AspNetCore.Authorization;
using CBetApi.Data;
using System.Security.Claims;
namespace CBetApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("v1/[controller]")]
    public class BetController : ControllerBase
    {
        private readonly BetService _betService;
        private readonly CBetApiDbContext _dbContext;

        public BetController(BetService betService, CBetApiDbContext dbContext)
        {
            _betService = betService;
            _dbContext = dbContext;

        }



        [HttpPost]
        public async Task<IActionResult> Create(BetForm options)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            var newBet = await _betService.CreateAsync(options, Int32.Parse(userId));


            return Ok(newBet);
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var bets = await _betService.GetBets();


            return Ok(bets);
        }
    }
}
