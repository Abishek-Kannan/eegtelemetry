using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EEGTelemetryAPI.Models
{
    public class ReportDetails
    {
        public int patientID { get; set; }
        public string patientName { get; set; }
        public DateTime? DOB { get; set; }
        public string sex { get; set; }
        public DateTime? lastSeizure { get; set; }
        public DateTime? lastMeal { get; set; }
        public string currentMedication { get; set; }
        public string findings { get; set; }
    }
}
