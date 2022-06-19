import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button'; 
import {  MatDatepickerModule } from '@angular/material/datepicker'; 
import {  MatMenuModule } from '@angular/material/menu'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import {NgApexchartsModule} from "ng-apexcharts";
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CreateReportComponent } from './create-report/create-report.component';
import { EegViewerComponent } from './eeg-viewer/eeg-viewer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { UploaderModule  } from '@syncfusion/ej2-angular-inputs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AdminDoctorComponent } from './admin-doctor/admin-doctor.component';
import { SubmitReportComponent } from './submit-report/submit-report.component';
import { GeneratePdfComponent } from './generate-pdf/generate-pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    CreateReportComponent,
    EegViewerComponent,
    AdminDoctorComponent,
    SubmitReportComponent,
    GeneratePdfComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule, MatFormFieldModule,  MatInputModule,
    BrowserAnimationsModule,
    NgbModule,HttpClientModule,
    Ng2SearchPipeModule,
    MatNativeDateModule,
    MatDatepickerModule,
    InputsModule,
    IntlModule,
    DateInputsModule,
    DropDownsModule,
    MatProgressSpinnerModule,
    UploaderModule,
  
    // NgApexchartsModule
  ],
  providers: [
    {
    provide: MatDialogRef,
    useValue: {} 
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateReportComponent]
})
export class AppModule { }
