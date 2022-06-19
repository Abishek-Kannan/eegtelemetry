import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  APIUrl = 'https://eegtelemetry.azurewebsites.net/api/';
  constructor(private http:HttpClient) { } 

  addScanReport(report : any) {
    let headers = new HttpHeaders();  
        headers.append('Content-Type', 'application/json');  
        const httpOptions = {  
            headers: headers  
        };  
    return this.http.post<any>( 'https://eegtelemetry.azurewebsites.net/api/' + 'admin/addScanReport', report ,httpOptions);
  }

  getReportList() : Observable<any>{  
    return this.http.get<any>( 'https://eegtelemetry.azurewebsites.net/api/' + 'admin/getReportList');
  }

  getReportData(reportID) {  
    let headers = new HttpHeaders();  
    headers.append('Content-Type', 'application/json');  
    const httpOptions = {  
        headers: headers  
    };  
    return this.http.get<any>( 'https://eegtelemetry.azurewebsites.net/api/' + 'admin/getReportData', { params: new HttpParams().set('reportID', reportID)});
  }

  submitReport(report : any) {
    let headers = new HttpHeaders();  
        headers.append('Content-Type', 'application/json');  
        const httpOptions = {  
            headers: headers  
        };  
    return this.http.post<any>( 'https://eegtelemetry.azurewebsites.net/api/' + 'admin/submitReport', report ,httpOptions);
  }

  clearNotification(ids : any[]) {
    let headers = new HttpHeaders();  
        headers.append('Content-Type', 'application/json');  
        const httpOptions = {  
            headers: headers  
        };  
    return this.http.post<any>( 'https://eegtelemetry.azurewebsites.net/api/' + 'admin/notificationAlertSeen', ids ,httpOptions);
  }

  copyFileToTemp(fileName : string) : Observable<any> {
    let headers = new HttpHeaders();  
    headers.append('Content-Type', 'application/json');  
    const httpOptions = {  
        headers: headers  
    };  
    return this.http.get<any>( 'https://eegtelemetry.azurewebsites.net/api/' + 'admin/copyFileToTemp', { params: new HttpParams().set('fileName', fileName)});
  }
}
