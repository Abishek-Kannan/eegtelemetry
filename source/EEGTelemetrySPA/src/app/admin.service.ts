import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getLoginDetails(user : User) {
    
    return this.http.post<any>( 'https://eegtelemetry.azurewebsites.net/api/'  + 'admin', user);
}
}
