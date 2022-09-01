import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DataService } from '../Services/data.service';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AlertController } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements AfterViewInit {

  @ViewChild('tempCanvas') private tempCanvas: ElementRef;
  @ViewChild('humedadCanvas') private humedadCanvas: ElementRef;
  @ViewChild('humedadSueloCanvas') private humedadSueloCanvas: ElementRef;
  @ViewChild('luxesCanvas') private luxesCanvas: ElementRef;
  @ViewChild('indCalCanvas') private indCalCanvas: ElementRef;
  @ViewChild('ventCanvas') private ventCanvas: ElementRef;
  @ViewChild('lucesCanvas') private lucesCanvas: ElementRef;
  @ViewChild('riegoCanvas') private riegoCanvas: ElementRef;

  graficoTemp: Chart;
  graficoHumedad: Chart;
  graficoHumedadSuelo: Chart;
  graficoLux: Chart;
  graficoIndCal: Chart;
  graficoVent: Chart;
  graficoLuces: Chart;
  graficoRiego: Chart;

  rango: string = 'month';

  data: any;

  constructor(private dataService: DataService, private file: File, private alertController: AlertController) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.getValues();
  }

  tempChartMethod(labels, data) {
    if(this.graficoTemp) this.graficoTemp.destroy();
    this.graficoTemp = new Chart(this.tempCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
            label: 'Temperatura',
            fill: false,
            backgroundColor: 'rgba(192,75,75,0.4)',
            borderColor: 'rgba(192,75,75,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(192,75,75,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(192,75,75,1)',
            pointHoverBorderColor: 'rgba(192,75,75,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
            spanGaps: false,
        }]
      }
    });
  }

  humedadChartMethod(labels, data) {
    if(this.graficoHumedad) this.graficoHumedad.destroy();
    this.graficoHumedad = new Chart(this.humedadCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
            label: 'Humedad',
            fill: false,
            backgroundColor: 'rgba(75,75,192,0.4)',
            borderColor: 'rgba(75,75,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,75,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,75,192,1)',
            pointHoverBorderColor: 'rgba(75,75,192,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
            spanGaps: false,
        }]
      }
    });
  }

  humedadSueloChartMethod(labels, data) {
    if(this.graficoHumedadSuelo) this.graficoHumedadSuelo.destroy();
    this.graficoHumedadSuelo = new Chart(this.humedadSueloCanvas.nativeElement, {
      type: 'line', 
      data: {
        labels: labels,
        datasets: [{
            label: 'Humedad suelo',
            fill: false,
            backgroundColor: 'rgba(75,192,75,0.4)',
            borderColor: 'rgba(75,192,75,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,75,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,75,1)',
            pointHoverBorderColor: 'rgba(75,192,75,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
            spanGaps: false,
        }]
      }
    });
  }

  indCalChartMethod(labels, data) {
    if(this.graficoIndCal) this.graficoIndCal.destroy();
    this.graficoIndCal = new Chart(this.indCalCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
            label: 'Indice de calor',
            fill: false,
            backgroundColor: 'rgba(192,75,75,0.4)',
            borderColor: 'rgba(192,75,75,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(192,75,75,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(192,75,75,1)',
            pointHoverBorderColor: 'rgba(192,75,75,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
            spanGaps: false,
        }]
      }
    });
  }

  luxChartMethod(labels, data) {
    if(this.graficoLux) this.graficoLux.destroy();
    this.graficoLux = new Chart(this.luxesCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
            label: 'Luminosidad',
            fill: false,
            backgroundColor: 'rgba(192,192,75,0.4)',
            borderColor: 'rgba(192,192,75,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(192,192,75,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(192,192,75,1)',
            pointHoverBorderColor: 'rgba(192,192,75,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
            spanGaps: false,
        }]
      }
    });
  }

  ventChartMethod(labels, data) {
    if(this.graficoVent) this.graficoVent.destroy();
    this.graficoVent = new Chart(this.ventCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
            label: 'Ventilación',
            fill: false,
            backgroundColor: 'rgba(192,192,192,0.4)',
            borderColor: 'rgba(192,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(192,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(192,192,192,1)',
            pointHoverBorderColor: 'rgba(192,192,192,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
            spanGaps: false,
        }]
      }
    });
  }

  lucesChartMethod(labels, data) {
    if(this.graficoLuces) this.graficoLuces.destroy();
    this.graficoLuces = new Chart(this.lucesCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
            label: 'Luces',
            fill: false,
            backgroundColor: 'rgba(192,192,192,0.4)',
            borderColor: 'rgba(192,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(192,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(192,192,192,1)',
            pointHoverBorderColor: 'rgba(192,192,192,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
            spanGaps: false,
        }]
      }
    });
  }

  riegoChartMethod(labels, data) {
    if(this.graficoRiego) this.graficoRiego.destroy();
    this.graficoRiego = new Chart(this.riegoCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
            label: 'Riego',
            fill: false,
            backgroundColor: 'rgba(192,192,192,0.4)',
            borderColor: 'rgba(192,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(192,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(192,192,192,1)',
            pointHoverBorderColor: 'rgba(192,192,192,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
            spanGaps: false,
        }]
      }
    });
  }

  getValues() {
    this.dataService.getAllData().subscribe(
      (res: any) => {
        this.data = res;
        this.updateCharts();
      })
  }

  updateCharts() {
    var datehoy = new Date();
    var fechas = [];
    var datosTemp = [];
    var datosHumedad = [];
    var datosHumedadSuelo = [];
    var datosLux = [];
    var datosIndCal = [];
    var datosVent = [];
    var datosLuces = [];
    var datosRiego = [];
    
    let sumaTemp: number = 0;
    let sumaHumedad: number = 0;
    let sumaHumedadSuelo: number = 0;
    let sumaLux: number = 0;
    let sumaIndCal: number = 0;
    let maxVent: number[] = [];
    let maxLuces: number[] = [];
    let maxRiego: number[] = [];

    let cantidadDatos: number = 0;

    for (let i = 0; i < this.data.length; i++) {
      var datedato = new Date(this.data[i].date);
      var datedatoanterior;
      if (this.data[i-1]) datedatoanterior = new Date(this.data[i-1].date);
      if(this.rango == 'day') {
        if (datehoy.getFullYear() == datedato.getFullYear() && datehoy.getMonth() == datedato.getMonth() && datehoy.getDate() == datedato.getDate()) {
          if (datedatoanterior) {
            if(datedato.getHours() != datedatoanterior.getHours() || i == this.data.length - 1) {
              fechas.push(`${datedatoanterior.getHours()} hs`);
              datosTemp.push(sumaTemp / cantidadDatos);
              datosHumedad.push(sumaHumedad / cantidadDatos);
              datosHumedadSuelo.push(sumaHumedadSuelo / cantidadDatos);
              datosLux.push(sumaLux / cantidadDatos);
              datosIndCal.push(sumaIndCal / cantidadDatos);
              datosVent.push(Math.max(...maxVent));
              datosLuces.push(Math.max(...maxLuces));
              datosRiego.push(Math.max(...maxRiego));
              sumaTemp = 0;
              sumaHumedad = 0;
              sumaHumedadSuelo = 0;
              sumaLux = 0;
              sumaIndCal = 0;
              maxVent = [];
              maxLuces = [];
              maxRiego = [];
              cantidadDatos = 0;
            }
          }
          sumaTemp+=this.data[i].temp;
          sumaHumedad+=this.data[i].humedad;
          sumaHumedadSuelo+=this.data[i].humedadsuelo;
          sumaIndCal+=this.data[i].indCal;
          sumaLux+=this.data[i].lux;
          maxVent.push(this.data[i].vent);
          maxLuces.push(this.data[i].luces);
          maxRiego.push(this.data[i].riego);
          cantidadDatos++;
        }
      }
      else if(this.rango == 'month') {
        if (datehoy.getFullYear() == datedato.getFullYear() && datehoy.getMonth() == datedato.getMonth()) {
          if (datedatoanterior) {
            if(datedato.getDate() != datedatoanterior.getDate() || i == this.data.length - 1) {
              fechas.push(`${datedatoanterior.getDate()}`);
              datosTemp.push(sumaTemp / cantidadDatos);
              datosHumedad.push(sumaHumedad / cantidadDatos);
              datosHumedadSuelo.push(sumaHumedadSuelo / cantidadDatos);
              datosLux.push(sumaLux / cantidadDatos);
              datosIndCal.push(sumaIndCal / cantidadDatos);
              datosVent.push(Math.max(...maxVent));
              datosLuces.push(Math.max(...maxLuces));
              datosRiego.push(Math.max(...maxRiego));
              sumaTemp = 0;
              sumaHumedad = 0;
              sumaHumedadSuelo = 0;
              sumaLux = 0;
              sumaIndCal = 0;
              maxVent = [];
              maxLuces = [];
              maxRiego = [];
              cantidadDatos = 0;
            }
          }
          sumaTemp+=this.data[i].temp;
          sumaHumedad+=this.data[i].humedad;
          sumaHumedadSuelo+=this.data[i].humedadsuelo;
          sumaIndCal+=this.data[i].indCal;
          sumaLux+=this.data[i].lux;
          maxVent.push(this.data[i].vent);
          maxLuces.push(this.data[i].luces);
          maxRiego.push(this.data[i].riego);
          cantidadDatos++;
        }
      }
      else if(this.rango == 'total') {
        fechas.push(`${datedato.getMonth()}-${datedato.getDate()}`);
        datosTemp.push(this.data[i].temp);
        datosHumedad.push(this.data[i].humedad);
        datosHumedadSuelo.push(this.data[i].humedadsuelo);
        datosIndCal.push(this.data[i].indCal);
        datosLux.push(this.data[i].lux);
        datosVent.push(this.data[i].vent);
        datosLuces.push(this.data[i].luces);
        datosRiego.push(this.data[i].riego);
      }
    }
    this.tempChartMethod(fechas, datosTemp);
    this.humedadChartMethod(fechas, datosHumedad);
    this.humedadSueloChartMethod(fechas, datosHumedadSuelo);
    this.indCalChartMethod(fechas, datosIndCal);
    this.luxChartMethod(fechas, datosLux);
    this.ventChartMethod(fechas, datosVent);
    this.lucesChartMethod(fechas, datosLuces);
    this.riegoChartMethod(fechas, datosRiego);
  }

  changeRange(interval) {
    this.rango = interval;
    this.updateCharts();
  }

  async displaySuccess(msg: string): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'successAlert',
      header: '¡Bien!',
      message: msg,
      buttons: [{
        text: 'Ok',
        role: 'Ok'
      }]
    });
    await alert.present();
    await alert.onDidDismiss();
  }

  toExcel() {
    this.dataService.toexcel().subscribe(res => {
      this.file.writeFile(Directory.Documents, 'datos.xlsx', res, {replace: true}).then(() => {
        this.displaySuccess('El archivo se guardó con éxito')
      }).catch(err => {
        this.displayErrorMsg(err);
      })
    })
  }

  async displayErrorMsg(msg: string): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'errorAlert',
      header: 'Error',
      message: msg,
      buttons: [{
        text: 'Ok',
        role: 'Ok'
      }]
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
