
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CBetApi.Services;
using CBetApi.Models.Forms;
using CBetApi.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace CBetApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("v1/[controller]")]
    public class CovidDataController : ControllerBase
    {

        private readonly CovidDataService _covidDataService;

        public CovidDataController(CovidDataService covidDataService)
        {
            _covidDataService = covidDataService;
        }




        [HttpGet("history")]
        public async Task<IActionResult> All()
        {
            var data = await _covidDataService.GetHistoryData();

            return Ok(data);
        }

        [HttpGet("countries")]
        public async Task<IActionResult> Country()
        {
            var data = await _covidDataService.GetCountries();

            return Ok(data);
        }

    }
}
