using EEGTelemetryAPI.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EEGTelemetryAPI.Application
{
    public interface IAdminService
    {
        Task<Admin> LoginAttempt(LoginData loginData);

        Task<string> AddScanReport(ReportDetails reportDetails,string EEGFile);

        Task<List<Report>> GetReportList();

        Task<Report> GetReportData(int reportID);

        Task<string> submitReport(Report report);

        Task<string> notificationAlertSeen(int[] ids);

        Task<string> isReportSubmitted(int[] ids);

    }
}
