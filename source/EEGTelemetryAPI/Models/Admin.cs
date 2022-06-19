using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EEGTelemetryAPI.Models
{
    public class Admin
    {
        public int AdminID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string EmailID { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DOB { get; set; }
        public string AdminRole { get; set; }
        public string Hospital { get; set; }
        public bool IsActive { get; set; }
        
    }
}
