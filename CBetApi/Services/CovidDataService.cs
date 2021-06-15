using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CBetApi.Data;
using CBetApi.Models;
using CBetApi.Models.Forms;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using System.Text.Json;

namespace CBetApi.Services
{
    public class CovidDataService
    {
        private readonly CBetApiDbContext _db;
        private readonly HttpClient _client;

        public CovidDataService(CBetApiDbContext db, HttpClient client)
        {
            _db = db;
            _client = new HttpClient()
            {
                BaseAddress = new Uri("https://covid-api.mmediagroup.fr")
            };
        }

        public async Task<List<Country>> GetCountries()
        {
            return await _db.Countries.ToListAsync<Country>();
        }

        public async Task<List<CovidHistoryData>> GetHistoryData()
        {
            var url = string.Format("/v1/history?status=confirmed");
            var result = new Dictionary<string, dynamic>();
            var response = await _client.GetAsync(url);
            var newResult = new List<CovidHistoryData>();

            if (response.IsSuccessStatusCode)
            {
                var stringResponse = await response.Content.ReadAsStringAsync();
                result = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(stringResponse,
                    new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            }
            else
            {
                throw new HttpRequestException(response.ReasonPhrase);
            }

            foreach (KeyValuePair<string, dynamic> entry in result)
            {
                entry.Value.TryGetProperty("All", out JsonElement all);
                all.TryGetProperty("dates", out JsonElement dates);
                all.TryGetProperty("abbreviation", out JsonElement code);
                CovidHistoryData data = formatHistoryData(dates);
                var country = await _db.Countries.FirstOrDefaultAsync(e => e.Name == entry.Key.ToString());
                data.Code = entry.Key.ToString();
                if (country != null)
                {
                    data.CountryId = country.Id;
                    data.CountryISO = country.Code;
                    newResult.Add(data);

                }
            }
            return newResult;
        }
        public async Task<List<CovidTodayData>> GetTodaysData()
        {
            var url = string.Format("/v1/history?status=confirmed");
            var result = new Dictionary<string, dynamic>();
            var response = await _client.GetAsync(url);
            var newResult = new List<CovidTodayData>();

            if (response.IsSuccessStatusCode)
            {
                var stringResponse = await response.Content.ReadAsStringAsync();
                result = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(stringResponse,
                    new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            }
            else
            {
                throw new HttpRequestException(response.ReasonPhrase);
            }

            foreach (KeyValuePair<string, dynamic> entry in result)
            {
                entry.Value.TryGetProperty("All", out JsonElement all);
                all.TryGetProperty("dates", out JsonElement dates);
                all.TryGetProperty("abbreviation", out JsonElement code);
                CovidTodayData data = formatTodayData(dates);
                var country = await _db.Countries.FirstOrDefaultAsync(e => e.Name == entry.Key.ToString());
                if (country != null)
                {
                    data.CountryId = country.Id;
                    newResult.Add(data);

                }
            }
            return newResult;
        }

        private CovidHistoryData formatHistoryData(JsonElement dates)
        {
            var today = DateTime.UtcNow;
            long avg = 0;
            var data = new CovidHistoryData();
            for (int i = 1; i < 8; i++)
            {
                var date = today.AddDays(-i).ToString("yyyy-MM-dd");

                var dateBefore = today.AddDays(-(i + 1)).ToString("yyyy-MM-dd");


                dates.TryGetProperty(date, out JsonElement casesDate);
                dates.TryGetProperty(dateBefore, out JsonElement casesDateBefore);
                long dateValue = casesDate.GetInt64();
                long dateBeforeVlaue = casesDateBefore.GetInt64();
                long difference = (casesDate.GetInt64() - casesDateBefore.GetInt64());
                avg = avg + (casesDate.GetInt64() - casesDateBefore.GetInt64());
                if (i == 7)
                {
                    data.ThisDayLastWeek = casesDate.GetInt64() - casesDateBefore.GetInt64();
                }
                if (i == 1)
                {
                    data.Yesterday = casesDate.GetInt64() - casesDateBefore.GetInt64();
                }
            }
            data.AverageLastWeek = avg / 7;

            return data;
        }

        private CovidTodayData formatTodayData(JsonElement dates)
        {
            var today = DateTime.UtcNow.AddDays(-1).ToString("yyyy-MM-dd");
            var yesterday = DateTime.UtcNow.AddDays(-2).ToString("yyyy-MM-dd");
            var data = new CovidTodayData();

            dates.TryGetProperty(today, out JsonElement casesDate);
            dates.TryGetProperty(yesterday, out JsonElement casesDateBefore);
            data.Value = casesDate.GetInt64() - casesDateBefore.GetInt64();

            return data;
        }
    }
}
