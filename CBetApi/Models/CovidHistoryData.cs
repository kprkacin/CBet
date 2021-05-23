
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
        public string Code { get; set; }
        public long thisDayLastWeek { get; set; }
        public long averageLastWeek { get; set; }

    }
}
