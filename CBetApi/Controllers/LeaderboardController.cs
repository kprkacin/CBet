
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
    public class LeaderboardController : ControllerBase
    {
        private readonly LeaderboardService _leaderboardService;


        public LeaderboardController(LeaderboardService leaderboardService)
        {
            _leaderboardService = leaderboardService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {

            var leaderboard = await _leaderboardService.GetBest();

            return Ok(
                leaderboard
            );
        }

    }
}
