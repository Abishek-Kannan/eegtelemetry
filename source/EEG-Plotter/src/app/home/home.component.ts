import {Component, HostListener, OnInit} from '@angular/core';
import {NgxCsvParser} from "ngx-csv-parser";
import {Router} from "@angular/router";
import zoomPlugin, {zoom} from 'chartjs-plugin-zoom';

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

Chart.register(
  zoomPlugin,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);



class Point{
  constructor(x: number, y: number) {
    this.x = x;
    this.y = -y;
  }
  x:number;
  y:number;

}

async function delay(secs:number){
  new Promise((resolve => {
    setTimeout(resolve,secs);
  }));
}


export class Points{
  chart:Chart | undefined;
  min:number = 0;
  max:number;
  canvas:HTMLCanvasElement | undefined;

  data:any[] = [];
  channel:any[];

  span:number = 100;


  constructor(label:string, max: number, span:number,channel: any[]) {
    this.max = max;
    this.channel = channel;
    this.span = span;
    this.plot(label)
  }
  plot(label: string){
    this._plot(label,this.splice(0,this.span));
  }
  private _plot(label: string,channel:any[]){
    // this.channel0 = this.sample;
    var rectangleSet = false;
    var parent = (document.getElementById('graph-plotter-section') as HTMLElement);
    this.canvas = document.createElement("canvas") as HTMLCanvasElement;
    this.canvas.id = 'myChart' + parent.children.length+1;
    parent.appendChild(this.canvas);
    this.data = channel;
    // const ctx = (document.getElementById('myChart' + parent.children.length+1) as HTMLCanvasElement);
    const ctx = this.canvas;
    let color = this.getRandomColor();
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array<string>(channel.length).fill(''),
        datasets: [{
          label: label,
          data: this.data,
          pointRadius:0,
          backgroundColor: [
            color
          ],
          borderColor: [
            color
          ],
          borderWidth: 1
        }]
      },
      options: {
        // parsing:false,
        animation: {
          onComplete: () =>{
            console.log("Render Complete");
          },
          onProgress: () =>{
            console.log("Render in Progress");
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            min:-200,
            max:200
          },
          x:{
            max:this.max,
          }
        },

        maintainAspectRatio:false,
        plugins: {
        }
      }
    });
    this.canvas.style.maxHeight = "250px";
    this.chart.draw();
  }

  public redraw(direction:number){
    if(direction == -1) {
      if(this.min<=0)
        return;
      this.min -= this.span;
      console.log("Updating " + this.splice(this.min, this.max));
      this.chart!.data.datasets[0].data = this.splice(this.min, this.max);
      this.chart!.update();
    }else {
      this.min += this.span;
      if(this.min>this.channel.length)
        return;
      console.log("Updating " + this.splice(this.min, this.max));
      this.chart!.data.datasets[0].data = this.splice(this.min, this.max);
      this.chart!.update();
    }
  }

  public getRandomColor(){
    return `rgba(${this.randRange(255)}, ${this.randRange(255)}, ${this.randRange(255)})`;
  }

  public randRange(max:number){
    return Math.random() * max | 0;
  }

  public splice(min:number,max:number){
    return this.channel.slice(min,this.min + this.span);
  }

}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'EEG-Plotter';
  csv: Array<any> = [];

  @HostListener('document:keydown.arrowleft', ['$event'])
  onClickLeft(event: KeyboardEvent) {
    console.log("left");
    this.channels.map((point)=>{
      point.redraw(-1);
    })
  }
  @HostListener('document:keydown.arrowright', ['$event'])
  onClickRight(event: KeyboardEvent) {
    console.log("right");
    this.channels.map((point)=>{
      point.redraw(1);
    })
  }

  private _scalableX = 1.0;
  private _scalableY = 1.0;
  private originy: number = 0.0;
  private scale: number = 1.0;
  private originx: number = 0.0;


  private data:Array<any> = [];


  private sample : Array<number> = [1500,6,2,3,5,8,0,10,1000,16,17,20]


  private canvas: HTMLCanvasElement | null | undefined;
  private canvasDrawable: CanvasRenderingContext2D | null | undefined;

  private canvasWidth = 5000;
  private canvasHeight = 750;

  private prevPoint:Point | undefined = undefined;
  private currPoint = new Point(0,0);

  private MAXH = 1828;
  private MAXW = 38561;

  private padY = 10;
  private padX = 10;
  public isLogging: boolean = false;

  channels:Array<Points> = [];

  private rectangleSet: Boolean = false;



  constructor(private csvReader:NgxCsvParser,private router:Router) {

  }
  ngOnInit(): void {
    console.log("Ng on Init");
  }


  onUploadFile(event:any){
    console.log(event);
    const file = event.srcElement.files[0];

    this.csvReader.parse(file,{ header: true, delimiter: ',' }).pipe().subscribe({
      next:(result):void =>{
        console.log(result);
        this.csv = result as Array<any>;
        let index = 0;
        while (index<18){
          try{
            this.process("Channel"+index);
            index+=1;
          }catch (e) {
            break;
          }
        }

      }
    })
  }

  async process(column:string){
    let length = this.csv.length;
    let channel = [];

    for(let index = 0;index<length;index++){
      channel.push(Number.parseFloat(this.csv[index][column]))
    }
    if(channel.every((value)=>{
      return isNaN(value);
    })){
      throw new Error("Column not Found");
    }
    var point = new Points(
      column,
      500,
      500,
      channel
    );
    this.channels.push(point);
  }

  ngAfterViewInit() {
  }



  navigateTo(path:string){
    this.router.navigateByUrl(path)
  }
}
