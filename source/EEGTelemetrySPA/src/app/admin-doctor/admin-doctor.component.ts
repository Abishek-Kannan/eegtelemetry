import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateReportComponent } from '../create-report/create-report.component';
import { ReportService } from '../report.service';
import { SubmitReportComponent } from '../submit-report/submit-report.component';

@Component({
  selector: 'app-admin-doctor',
  templateUrl: './admin-doctor.component.html',
  styleUrls: ['./admin-doctor.component.scss']
})
export class AdminDoctorComponent implements OnInit {
  constructor( private changeDetectorRefs: ChangeDetectorRef,public dialogBox: MatDialog,  private router: Router,@Inject(DOCUMENT) private document: Document , private reportService : ReportService) { }
  searchText : any ;
  scanReportList : any;
  showReportModalFlag : boolean = false;
  isDataLoading : boolean = false;
  newReports : any[]= [];
  notificationText = "" ;

  reports = [
    { id: 1, name: 'Abishek Kannan', scanCentre: 'XYZ Hospitals', recordingTime : '2021-06-29 15:57:49', reportingTime : '2021-06-29 15:57:49' , isReported : true  },
    { id: 2, name: 'John Doe' , scanCentre: 'Global' , recordingTime : '2021-06-29 15:57:49', reportingTime : '2021-06-29 15:57:49' , isReported : false },
   
  ];
  ngOnInit(): void {
    this.reportService.getReportList().subscribe(result => {
      this.scanReportList = result;
      this.scanReportList.map(a => {
        if(a.isReportSeen == false){
          this.newReports.push(a.reportID);
        }
      });
      if(this.newReports.length > 0) {
           if(this.newReports.length == 1){
             this.notificationText = '1 report has been added';
           }
           else {
            this.notificationText = this.newReports.length + ' reports have been added';
           }
      }
      else {
            this.notificationText = 'No new report has been added';
      }
      console.log(this.newReports,'newreports');
    });
  }

  showReportModalPopup(event) : void {
    console.log('dialog open');
    const dialogRef = this.dialogBox.open(SubmitReportComponent, {
      width: '630px',
      height: '530px',
      disableClose: true ,
      data: { reportID : event ,}
    });
    
    this.reportService.clearNotification([event]).subscribe(res => {
       this.newReports.filter(item => item !== event);
    });

    dialogRef.componentInstance.onSave.subscribe(data=> {
      
      this.reportService.getReportList().subscribe(result => {
        this.scanReportList = result;
        this.newReports = [];
        this.isDataLoading = false;
        this.scanReportList.map(a => {
          if(a.isReportSeen == false){
            this.newReports.push(a.reportID);
          }
        });
        if(this.newReports.length > 0) {
             if(this.newReports.length == 1){
               this.notificationText = '1 report has been added';
             }
             else {
              this.notificationText = this.newReports.length + ' reports have been added';
             }
        }
        else {
              this.notificationText = 'No new report has been added';
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
          if(a.isReportSeen == false){
            this.newReports.push(a.reportID);
          }
        });
        if(this.newReports.length > 0) {
             if(this.newReports.length == 1){
               this.notificationText = '1 report has been added';
             }
             else {
              this.notificationText = this.newReports.length + ' reports have been added';
             }
        }
        else {
              this.notificationText = 'No new report has been added';
        }
        this.changeDetectorRefs.detectChanges();
      });
      }
    });
    
  }

  viewEEG(data) {
    this.reportService.copyFileToTemp(data.eegFile).subscribe(result => {
      
    });
    setTimeout(() =>window.open('https://eeg-plotter.azurewebsites.net') ,2500);
    //this.document.location.href = 'http://desktop-159ue8h:9988/webapps/home/session.html?app=plotfig';
   

  }

  clearNotifications() {
     this.reportService.clearNotification(this.newReports).subscribe(result => {
        if(result) {
          this.newReports = [];
        }
     });
  }

}
