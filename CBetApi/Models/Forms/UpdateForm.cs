using System;
using System.ComponentModel.DataAnnotations;

namespace CBetApi.Models.Forms
{
    public class UpdateForm
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }

    }
}
