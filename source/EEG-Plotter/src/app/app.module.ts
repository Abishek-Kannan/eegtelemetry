import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { HomeComponent } from './home/home.component';
import {NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgApexchartsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
