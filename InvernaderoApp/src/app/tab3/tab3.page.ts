import { Component, OnInit } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  chart: ApexChart;
  series: ApexAxisChartSeries | any[];
  stroke: ApexStroke;
  markers: ApexMarkers;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: any[];
  labels: any[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {

  public tempOptions: Partial<ChartOptions>;
  public humedadOptions: Partial<ChartOptions>;
  public humedadSueloOptions: Partial<ChartOptions>;
  public luxesOptions: Partial<ChartOptions>;
  public indCalOptions: Partial<ChartOptions>;
  public lucesOptions: Partial<ChartOptions>;
  public riegoOptions: Partial<ChartOptions>;
  public ventOptions: Partial<ChartOptions>;

  constructor() {
   
  }

  ngOnInit(): void {
    this.initTempChart();
  }


  initTempChart() {
    this.tempOptions = {
      chart: {
        type: 'line',
        height: 100,
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          opacity: 0.2,
        },
      },
      series: [
        {
          name: 'Hola',
          data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69],
        },
      ],
      stroke: {
        width: 3,
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      grid: {
        padding: {
          top: 20,
          left: 110,
          bottom: 10,
        },
      },
      colors: ['#00F'],
      tooltip: {
        theme: 'light',
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function formatter(val) {
              return 'Hola'; // remove title in tooltip
            },
          },
        },
      },
    };
  }

}
