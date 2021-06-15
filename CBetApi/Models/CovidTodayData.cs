
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CBetApi.Models
{
    public class CovidTodayData
    {
        public int CountryId { get; set; }
        public long Value { get; set; }

    }
}
