using EEGTelemetryAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EEGTelemetryAPI.Repository
{
    public interface IAdminRepository
    {
        public Task<Admin> LoginAttempt(LoginData loginData);

        public Task<string> AddScanReport(ReportDetails reportDetails, string EEGFile);

        public Task<List<Report>> GetReportList();

        public Task<Report> GetReportData(int reportID);

        public Task<string> submitReport(Report report);

        public Task<string> notificationAlertSeen(int[] ids);

        public Task<string> isReportSubmitted(int[] ids);

    }
}
