using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EEGTelemetryAPI.Models
{
    public class Report
    {
        public int ReportID { get; set; }
        public int PatientID { get; set; }
        public string PatientFullName { get; set; }
        public DateTime? DOB { get; set; }
        public string Sex { get; set; }
        public DateTime? LastSeizure { get; set; }
        public DateTime? LastMeal { get; set; }
        public string CurrentMedication { get; set; }
        public string Findings { get; set; }
        public string ScanCentre { get; set; }
        public string ReportStatus { get; set; }
        public DateTime? RecordingTime { get; set; }
        public DateTime? ReportingTime { get; set; }
        public string EEGFile { get; set; }
        public string Interpretation { get; set; }
        public string ClinicalCorrelation { get; set; }
        public bool isReportSubmitted { get; set; }
        public bool isReportSeen { get; set; }
    }
}
