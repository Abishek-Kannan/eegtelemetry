import { Component, ElementRef, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { ReportService } from '../report.service';
interface DialogData {
  technicianId: string;
}

@Component({
  selector: 'app-submit-report',
  templateUrl: './submit-report.component.html',
  styleUrls: ['./submit-report.component.scss']
})
export class SubmitReportComponent implements OnInit {
  reportForm: FormGroup;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  fileToUpload: File;
  @ViewChild('eegInput', {  
    static: true  
  }) eegInput; 
  value : any;
  file: File = null; // Variable to store file
  onSave = new EventEmitter();
  reportData : any;

  public listItems: Array<string> = [
    "Male",
    "Female",
    "Other",

  ];
  public path: Object = {
    saveUrl: 'https://localhost:44342/api/recruitment/Save',
    removeUrl: 'https://localhost:44342/api/Recruitment/Remove' ,
    chunkSize: 102400,
    
  };
  reportId : any;

  constructor(private reportService : ReportService,private formBuilder: FormBuilder, public dialogRef: MatDialogRef<SubmitReportComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.reportId = data;
    }

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      reportID : [],
      patientID: ['', Validators.required],
      patientName: [''],
      DOB: [],
      sex: [''],
      lastSeizure: [],
      lastMeal: [],
      currentMedication: [''],
      findings: [''],
      interpretation : [''],
      clinicalCorrelation : ['']
    });

    this.reportService.getReportData(this.reportId?.reportID).subscribe(result => {
      this.reportData = result;
       this.setTechnicianData(this.reportData);
     });
     
  }

  setTechnicianData(data){
    this.reportForm.patchValue({
      reportID : data.reportID,
      patientID : data.patientID,
      patientName : data.patientFullName,
      DOB : data.dob,
      sex : data.sex,
      lastSeizure : data.lastSeizure,
      lastMeal : new Date(data.lastMeal),
      currentMedication : data.currentMedication,
      findings : data.findings,
      interpretation : data.interpretation,
      clinicalCorrelation : data.clinicalCorrelation
    });
    console.log(this.reportForm);
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  handleFileInput(event) {

    // this.fileToUpload = (event.target as HTMLInputElement).files[0] as File;
    // var reader = new FileReader();
    // reader.readAsDataURL(this.fileToUpload);

  }

  onChange(event) {
    this.file = event.target.files[0];
}

  addReport() {
    let data = new FormData();
    //data.append("reportDetails", JSON.stringify(this.reportForm.value));

    
 
    // const doc = new jsPDF();
   
    // const pdfTable = this.pdfTable.nativeElement;
   
    // var html = htmlToPdfmake(pdfTable.innerHTML);
     
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).open();

    this.reportService.submitReport(this.reportForm.value).subscribe(result => {
      this.onSave.emit(result);
     });
    
  }
}

