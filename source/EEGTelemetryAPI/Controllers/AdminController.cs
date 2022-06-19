using Azure.Storage.Blobs;
using EEGTelemetryAPI.Application;
using EEGTelemetryAPI.Models;
using EEGTelemetryAPI.Models.DBContext;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace EEGTelemetryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private IWebHostEnvironment Environment;

        private readonly ILogger<AdminController> _logger;
        private readonly IAdminService _adminService;
        //private readonly IReportService _reportService;

        public AdminController(IWebHostEnvironment _environment,ILogger<AdminController> logger,IAdminService adminService)
        {
          _logger = logger;
          _adminService = adminService;
            Environment = _environment;
            //_reportService = reportService;
        }

        [HttpPost]
        public async Task<Admin> LoginAttempt(LoginData loginData)
        {    
          return await _adminService.LoginAttempt(loginData);
        }

        [HttpPost]
        [RequestFormLimits(MultipartBodyLengthLimit = 209715200)]
        [Route("addScanReport")]
        public async Task<IActionResult> AddScanReport(IFormCollection data)
        {

            string wwwPath = this.Environment.WebRootPath;
            string contentPath = this.Environment.ContentRootPath;
            string a = data["reportDetails"];
            ReportDetails reportDetails = JsonConvert.DeserializeObject<ReportDetails>(data["reportDetails"]);
            BlobServiceClient blobServiceClient = new BlobServiceClient("DefaultEndpointsProtocol=https;AccountName=eegfilesstorage;AccountKey=vDLFtWuC6FibcLEpmLXelDc3CYC+9aNh7EqFdhXmKOv2Vbu5bKEE3LJO0n5u8qiGEbY6bZyOFc6o+AStu4bhqw==;EndpointSuffix=core.windows.net");

            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient("eegfiles");

            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=eegfilesstorage;AccountKey=vDLFtWuC6FibcLEpmLXelDc3CYC+9aNh7EqFdhXmKOv2Vbu5bKEE3LJO0n5u8qiGEbY6bZyOFc6o+AStu4bhqw==;EndpointSuffix=core.windows.net");
            CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
            string strContainerName = "eegfiles";
            byte[] fileData = new byte[data.Files[0].Length];

            CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(strContainerName);
            string fileName = data.Files[0].FileName;

            if (await cloudBlobContainer.CreateIfNotExistsAsync())
            {
                await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
            }

            if (fileName != null && fileData != null)
            {
                CloudBlockBlob cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(data.Files[0].FileName);
                //cloudBlockBlob.Properties.ContentType = fileMimeType;
                await cloudBlockBlob.UploadFromByteArrayAsync(fileData, 0, fileData.Length);
            }

            var httpClient = new HttpClient();
            Task<string> response = _adminService.AddScanReport(reportDetails, data.Files[0].FileName);
            return Ok(response);





        }

        [HttpGet]
        [Route("copyFileToTemp")]
        public async Task<string> copyFileToTemp(string fileName = "")
        {
            
            string destFile = string.Empty;
            string wwwPath = this.Environment.WebRootPath;
            string contentPath = this.Environment.ContentRootPath;
            string path = Path.Combine(this.Environment.WebRootPath, "Uploads");
            string targetPath = Path.Combine(this.Environment.WebRootPath, "Temp");
            if (System.IO.Directory.Exists(path))
            {
                string file = Path.Combine(path,fileName);
                DirectoryInfo dir = new DirectoryInfo(targetPath);
                foreach (FileInfo fi in dir.GetFiles())
                {
                    fi.Delete();
                }
                fileName = System.IO.Path.GetFileName(file);
                destFile = System.IO.Path.Combine(targetPath, fileName);
                System.IO.File.Copy(file, destFile, true);
                
            }
            return "Success";

        }



            [HttpPost]
        [Route("submitReport")]
        public async Task<IActionResult> submitReport(Report report)
        {           
           Task<string> response = _adminService.submitReport(report);
           return Ok(response);
        }

        [HttpPost]
        [Route("reportSubmitted")]
        public async Task<IActionResult> isReportSubmitted(int[] ids)
        {
            Task<string> response = _adminService.isReportSubmitted(ids);
            return Ok(response);
        }

        [HttpPost]
        [Route("notificationAlertSeen")]
        public async Task<IActionResult> notificationAlertSeen(int[] ids)
        {
            Task<string> response = _adminService.notificationAlertSeen(ids);
            return Ok(response);
        }

        [HttpGet]
        [Route("getReportList")]
        public async Task<List<Report>> GetReportList()
        {
            return await _adminService.GetReportList();
        }

        [HttpGet]
        [Route("getReportData")]
        public async Task<Report> GetReportData(int reportID = 3)  
        {
            return await _adminService.GetReportData(reportID);
        }



    }
}
