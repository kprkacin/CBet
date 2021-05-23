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

                data.Code = entry.Key.ToString();

                newResult.Add(data);
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
                    data.thisDayLastWeek = casesDate.GetInt64() - casesDateBefore.GetInt64();
                }
            }
            data.averageLastWeek = avg / 7;

            return data;
        }
    }
}
