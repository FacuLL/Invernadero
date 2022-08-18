import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements AfterViewInit {

  @ViewChild('tempCanvas') private tempCanvas: ElementRef;

  graficoTemp: any;

  rango: string = 'mes';

  constructor(private dataService: DataService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.tempChartMethod();
  }

  tempChartMethod() {
    this.graficoTemp = new Chart(this.tempCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Temperatura',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
    this.getValues();
  }

  getValues() {
    this.dataService.getAllData().subscribe(
      (res: any) => {
        var fechahoy = new Date();
        var fechas = [];
        var datosTemp = [];
        for (let i = 0; i < res.length; i++) {
          var fechadato = new Date(res[i].date);
          console.log(fechadato.getTime());
          if(this.rango == 'dia') {
            if (res[i].date.getDay == fechahoy.getDay) {

            }
          }
          fechas.push(res[i].date)
        }
        this.graficoTemp.data.labels = fechas;
      })
  }
}
