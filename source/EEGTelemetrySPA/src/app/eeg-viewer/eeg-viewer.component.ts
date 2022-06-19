import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'eeg-viewer',
  templateUrl: './eeg-viewer.component.html',
  styleUrls: ['./eeg-viewer.component.scss']
})
export class EegViewerComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer) { }

  url: string = "http://desktop-159ue8h:9988/webapps/home/session.html?app=plotfig";
  urlMap: SafeResourceUrl;

  ngOnInit(): void {
    this.urlMap= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }


}
