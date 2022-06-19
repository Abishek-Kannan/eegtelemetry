import { Component, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../report.service';
interface DialogData {
  technicianId: string;
}
@Component({
  selector: 'create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {
  reportForm: FormGroup;
  fileToUpload: File;
  @ViewChild('eegInput', {  
    static: true  
  }) eegInput; 
  value : any;
  file: File = null; // Variable to store file
  onSave = new EventEmitter();

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

  constructor(private reportService : ReportService,private formBuilder: FormBuilder, public dialogRef: MatDialogRef<CreateReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      patientID: ['', Validators.required],
      patientName: [''],
      DOB: [],
      sex: [''],
      lastSeizure: [],
      lastMeal: [],
      currentMedication: [''],
      findings: [''],

    });
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
    const formData = new FormData(); 
        
    // Store form name as "file" with file data
    formData.append("file", this.file, this.file.name);
    let report = {
      reportDetails : this.reportForm.value,
       fileData : this.file
    }
    let data = new FormData();
    data.append("file", this.file, this.file.name);
    data.append("reportDetails", JSON.stringify(this.reportForm.value));
    this.reportService.addScanReport(data).subscribe(result => {
      this.onSave.emit(data);
     });
    
  }
}
