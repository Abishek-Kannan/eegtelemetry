using EEGTelemetryAPI.Models;
using EEGTelemetryAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EEGTelemetryAPI.Application
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;

        public AdminService(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        public async Task<Admin> LoginAttempt(LoginData loginData)
        {
            return await _adminRepository.LoginAttempt(loginData);
        }

        
        public async Task<string> AddScanReport(ReportDetails reportDetails,string EEGFile)
        {
            return await _adminRepository.AddScanReport(reportDetails, EEGFile);
        }

        public async Task<List<Report>> GetReportList()
        {
            return await _adminRepository.GetReportList();
        }

        public async Task<Report> GetReportData(int reportID)
        {
            return await _adminRepository.GetReportData(reportID);
        }

        public async Task<string> submitReport(Report report)
        {
            return await _adminRepository.submitReport(report);
        }

        public async Task<string> isReportSubmitted(int[] ids)
        {
            return await _adminRepository.isReportSubmitted(ids);
        }

        public async Task<string> notificationAlertSeen(int[] ids)
        {
            return await _adminRepository.notificationAlertSeen(ids);
        }
    }
}
