import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";
import {max, of} from "rxjs";
import {ChartComponent} from "ng-apexcharts";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{

  title:string = "Telemetry App"
  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
