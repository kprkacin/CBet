
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CBetApi.Models
{
    public class CovidHistoryData
    {
        public int CountryId { get; set; }
        public string Code { get; set; }
        public long ThisDayLastWeek { get; set; }
        public long AverageLastWeek { get; set; }
        public long Yesterday { get; set; }

    }
}
