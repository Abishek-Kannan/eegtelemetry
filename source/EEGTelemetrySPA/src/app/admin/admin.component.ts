import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateReportComponent } from '../create-report/create-report.component';
import { ReportService } from '../report.service';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor( private changeDetectorRefs: ChangeDetectorRef,public dialog: MatDialog,  private router: Router,@Inject(DOCUMENT) private document: Document , private reportService : ReportService) { }
  searchText : any ;
  scanReportList : any;
  showReportModalFlag : boolean = false;
  isDataLoading : boolean = false;
  pdfSpacing = '                                                       ';
  reportData : any;
  newReports : any[]= [];
  notificationText = "";

  reports = [
    { id: 1, name: 'Abishek Kannan', scanCentre: 'XYZ Hospitals', recordingTime : '2021-06-29 15:57:49', reportingTime : '2021-06-29 15:57:49' , isReported : true  },
    { id: 2, name: 'John Doe' , scanCentre: 'Global' , recordingTime : '2021-06-29 15:57:49', reportingTime : '2021-06-29 15:57:49' , isReported : false },
   
  ];
  ngOnInit(): void {
    this.reportService.getReportList().subscribe(result => {
      this.scanReportList = result;
      this.newReports = [];
      this.scanReportList.map(a => {
        if(a.isReportSubmitted == true){
          this.newReports.push(a.reportID);
        }
      });
      if(this.newReports.length > 0) {
           if(this.newReports.length == 1){
             this.notificationText = '1 report has been submitted';
           }
           else {
            this.notificationText = this.newReports.length + ' reports have been submitted';
           }
      }
      else {
            this.notificationText = 'No new report has been submitted';
      }
    });
  }

  showReportModalPopup(event) : void {
    const dialogRef = this.dialog.open(CreateReportComponent, {
      width: '610px',
      height: '530px',
      disableClose: true ,
      data: {}
    });

    dialogRef.componentInstance.onSave.subscribe(data=> {
      
      this.reportService.getReportList().subscribe(result => {
        this.scanReportList = result;
        this.isDataLoading = false;
        this.newReports = [];
      this.scanReportList.map(a => {
        if(a.isReportSubmitted == true){
          this.newReports.push(a.reportID);
        }
      });
      if(this.newReports.length > 0) {
           if(this.newReports.length == 1){
             this.notificationText = '1 report has been submitted';
           }
           else {
            this.notificationText = this.newReports.length + ' reports have been submitted';
           }
      }
      else {
            this.notificationText = 'No new report has been submitted';
      }
        this.changeDetectorRefs.detectChanges();
      });
    })
    
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'cancel'){
        this.isDataLoading = false;
      }
      else{
      this.isDataLoading = true;
      this.reportService.getReportList().subscribe(result => {
        this.scanReportList = result;
        this.newReports = [];
      this.scanReportList.map(a => {
        if(a.isReportSubmitted == true){
          this.newReports.push(a.reportID);
        }
      });
      if(this.newReports.length > 0) {
           if(this.newReports.length == 1){
             this.notificationText = '1 report has been submitted';
           }
           else {
            this.notificationText = this.newReports.length + ' reports have been submitted';
           }
      }
      else {
            this.notificationText = 'No new report has been submitted';
      }
        this.changeDetectorRefs.detectChanges();
      });
      }
    });
    
  }

  viewEEG(id) {
    window.open('https://eeg-plotter.azurewebsites.net');

  }

  clearNotifications() {
    this.reportService.clearNotification(this.newReports).subscribe(result => {
       if(result) {
         this.newReports = [];
       }
    });
 }


  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
  
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
  
        var dataURL = canvas.toDataURL("image/png");
  
        resolve(dataURL);
      };
  
      img.onerror = error => {
        reject(error);
      };
  
      img.src = url;
    });
  }

  async downloadAsPdf(reportID){
    this.reportService.getReportData(reportID).subscribe(async result => {
       this.reportData = result;
       this.newReports.filter(item => item !== reportID);
       let docDefinition = {  
        content: [  
          {  
            text: 'Report',  
            alignment: 'center',
            style: 'sectionHeader',
            fontSize: 18,  
          }, 
          {
            columns: [
            {
              text: 'Patient ID : ' + this.reportData.patientID  ,  
              fonSize : 14,
              alignment: 'left', 
              style : 'patientDetails'
            },
            {
              text:  'Patient Name : ' + this.reportData.patientFullName,  
              fonSize : 14,
              alignment: 'left', 
              style : 'patientDetails'
            }
            ] 
          },
          {
            columns: [
            {
              text: 'DOB : ' + this.reportData.dob ,  
              fontSize: 14,  
              alignment: 'left',  
              style : 'patientDetails'
            },
            {
              text: 'Sex : ' + this.reportData.sex,  
              fontSize: 14,  
              alignment: 'left',  
              style : 'patientDetails'
            }
            ] 
          },
          {
            columns: [
            {
              text: 'Last Seizure : ' + this.reportData.lastSeizure + this.pdfSpacing ,  
              fontSize: 14,  
              alignment: 'left',  
              style : 'patientDetails'
            },
            {
              text: 'Last Meal : ' + this.reportData.lastMeal,  
            fontSize: 14,  
            alignment: 'left',  
            style : 'patientDetails'
            }
            ] 
          },
          
          {  
            text: 'Current Medication : ' ,  
            fontSize: 14,  
            alignment: 'left',  
            style : 'reportHeadings'
           
          },  
          {  
            text: this.reportData.currentMedication,  
            fontSize: 14,  
            alignment: 'left',  
            style : 'reportDetails'
           
          },  
          {  
            text: 'Findings : ',  
            fontSize: 14,  
            alignment: 'left',  
            style : 'reportHeadings'

          },  
          {  
            text:  this.reportData.findings,  
            fontSize: 14,  
            alignment: 'left',  
            style : 'reportDetails'

          },  
          {  
            text: 'Interpretation : ' + this.reportData.interpretation,  
            fontSize: 14,  
            alignment: 'left',  
            style : 'patientDetails'
           
          },  
          {  
            text: 'Clinical Correlation : ' ,  
            fontSize: 14,  
            alignment: 'left',  
            style : 'reportHeadings'
           
          },  
          {  
            text:this.reportData.clinicalCorrelation,  
            fontSize: 14,  
            alignment: 'left',  
            style : 'clinicalCorrelation'
           
          },  
          
          {
            columns: [
            {
              image: await this.getBase64ImageFromURL("../../assets/unnamed.jpg") ,
             width: 100,
             height: 100,
            // style : 'imageStyle'
            },
            {
              image: await this.getBase64ImageFromURL("../../assets/signature-523237_1280.jpg") ,
               width: 100,
               height: 100,
               style : 'imageStyle'
            }
            ] 
          },
          {
            columns: [
            {
              text: 'EEG Technoligist' ,  
              fontSize: 14,  
              alignment: 'left',  
              //style : 'patientDetails'
            },
            {
              text: 'Reporting Neurophysician' ,  
            fontSize: 14,  
            alignment: 'left',  
            style : 'reportingPhy'
            }
            ] 
          }
          ],
          styles: {  
            sectionHeader: {  
                bold: true,  
                decoration: 'underline',  
                //fontSize: 14,  
                margin: [5, 15, 0, 15]  
            } ,
            patientDetails: {  
              
              fontSize: 14,  
              margin: [5, 15, 0, 5]  
          }  ,
          reportDetails : {
            margin : [35,5,0,15]
          },
          clinicalCorrelation : {
            margin : [35,5,10,90]
          },
          reportHeadings : {
            bold : true,
            decoration : 'underline',
            margin : [5,25,0,0]
          },

          imageStyle : {
            margin : [240,0,0,0]
          },
          reportingPhy : {
            margin : [70,0,0,0]
          }
          }  
        };  
      
     
      pdfMake.createPdf(docDefinition).download('patientReport.pdf');
     });
  }

}
