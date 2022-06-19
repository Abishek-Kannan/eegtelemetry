using EEGTelemetryAPI.Models;
using EEGTelemetryAPI.Models.DBContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EEGTelemetryAPI.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly AdminContext _admincontext;
        private readonly ReportContext _reportcontext;

        public AdminRepository(AdminContext admincontext,ReportContext reportContext)
        {
            _admincontext = admincontext;
            _reportcontext = reportContext;
        }
        public async Task<Admin> LoginAttempt(LoginData loginData)
        {
            Admin result = new Admin();
            result = _admincontext.Admins.Where(c => c.UserName == loginData.username && c.Password == loginData.password).FirstOrDefault();
            return result;
        }

        public async Task<List<Report>> GetReportList()
        {
            List<Report> result = new List<Report>();
            result = _reportcontext.Reports.AsQueryable().OrderByDescending(a => a.RecordingTime).ToList();
            return result;
        }

        public async Task<Report> GetReportData(int reportID)
        {
            Report result = new Report();
            result = _reportcontext.Reports.AsQueryable().FirstOrDefault(res => res.ReportID == reportID);
            return result;
        }

        public async Task<string> submitReport(Report report)
        {
            using (_reportcontext)
            {
         

                Report reportDetails = _reportcontext.Reports.Where(d => d.ReportID == report.ReportID).First();
                reportDetails.ReportStatus = "Reported";
                reportDetails.isReportSubmitted = true;
                reportDetails.Interpretation = report.Interpretation;
                reportDetails.ClinicalCorrelation = report.ClinicalCorrelation;
                reportDetails.ReportingTime = DateTime.Now;
                _reportcontext.SaveChanges();

                return "Report added successfully";
            }
        }

        public async Task<string> notificationAlertSeen(int[] ids)
        {
            using (_reportcontext)
            {
                foreach(int id in ids)
                {
                    Report reportDetails = _reportcontext.Reports.Where(d => d.ReportID == id).First();
                    reportDetails.isReportSeen = true;
                    _reportcontext.SaveChanges();
                }

                return "Changes added successfully";
            }
        }

        public async Task<string> isReportSubmitted(int[] ids)
        {
            using (_reportcontext)
            {
                foreach (int id in ids)
                {
                    Report reportDetails = _reportcontext.Reports.Where(d => d.ReportID == id).First();
                    reportDetails.isReportSubmitted = false;
                    _reportcontext.SaveChanges();
                }

                return "Changes added successfully";
            }
        }


        public async Task<string> AddScanReport(ReportDetails reportDetails, string EEGFile)
        {
            var report = new Report {
                PatientID = reportDetails.patientID,
                PatientFullName = reportDetails.patientName,
                DOB = reportDetails.DOB,
                Sex = reportDetails.sex,
                LastSeizure = reportDetails.lastSeizure,
                LastMeal = reportDetails.lastMeal,
                CurrentMedication = reportDetails.currentMedication,
                Findings = reportDetails.findings,
                ReportStatus = "Pending",
                RecordingTime = DateTime.Now,
                EEGFile = EEGFile,
                ScanCentre = "Global Medicals",
                isReportSeen = false,
                isReportSubmitted = false
        };
            _reportcontext.Add(report);
            var result = _reportcontext.SaveChanges();
            if (result == 1) { 
                return "Report added successfuly"; 
            }
            else
            {
                return "There is an error adding the new report";
            }

        }
    }
}
