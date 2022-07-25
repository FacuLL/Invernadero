import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, interval, Subject, timer, throwError} from 'rxjs';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/Services/data.service';
import { CircleProgressComponent } from 'ng-circle-progress';
import { HttpErrorResponse } from '@angular/common/http';
import { Valores } from '../Models/valores';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private dataService:DataService, private alertController: AlertController) {}

  public temp: Number = 40;
  public humedad: Number = 90;
  public indCal: Number = 40;
  public humedadsuelo: Number = 90;
  public lux: Number = 1500;
  public ventilacion: boolean = false;
  public lampara: boolean = false;
  public riego: boolean = false;

  public errorcard: string = '';

  @ViewChild('circleProgress') circleProgress: CircleProgressComponent;

  optionsTemp = {
    percent: this.getPercentage(0, 50, this.temp),
    title: `${this.temp}ºC`,
    innerStrokeColor: "#995959",
    subtitle: 'Temperatura'
  }
  optionsHumedad = {
    percent: this.humedad,
    title: `${this.humedad}%`,
    outerStrokeColor: "#0f0fff",
    outerStrokeGradientStopColor: "#5252ff",
    innerStrokeColor: "#595999",
    subtitle: "Humedad"
  }
  optionsHumSuelo = {
    percent: this.humedadsuelo,
    title: `${this.humedadsuelo}%`,
    outerStrokeColor: "#0fff0f",
    outerStrokeGradientStopColor: "#52ff52",
    innerStrokeColor: "#599959",
    subtitle: "Humedad del suelo"
  }
  optionsLuz = {
    percent: this.getPercentage(0, 2500, this.lux),
    title: `${this.lux} Luxes`,
    outerStrokeColor: "#ffff0f",
    outerStrokeGradientStopColor: "#ffff52",
    innerStrokeColor: "#999959",
    subtitle: "Luz"
  }

  ngOnInit() {
    this.reloadData();
    this.reloadValues();
  }

  updateCircles(): void {
    this.optionsTemp = {
      percent: this.getPercentage(0, 50, this.temp),
      title: `${this.temp}ºC`,
      innerStrokeColor: "#995959",
      subtitle: 'Temperatura'
    }

    this.optionsHumedad = {
      percent: this.humedad,
      title: `${this.humedad}%`,
      outerStrokeColor: "#0f0fff",
      outerStrokeGradientStopColor: "#5252ff",
      innerStrokeColor: "#595999",
      subtitle: "Humedad"
    }

    this.optionsHumSuelo = {
      percent: this.humedadsuelo,
      title: `${this.humedadsuelo}%`,
      outerStrokeColor: "#0fff0f",
      outerStrokeGradientStopColor: "#52ff52",
      innerStrokeColor: "#599959",
      subtitle: "Humedad del suelo"
    }

    this.optionsLuz = {
      percent: this.getPercentage(0, 2500, this.lux),
      title: `${this.lux} Luxes`,
      outerStrokeColor: "#ffff0f",
      outerStrokeGradientStopColor: "#ffff52",
      innerStrokeColor: "#999959",
      subtitle: "Luz"
    }
  }

  getPercentage(min, max, actual): Number {
    return actual / (max - min) * 100
  }

  reloadData() {
    const intervalo = timer(0, 10000).subscribe((second) => {
      this.dataService.getLastData().subscribe(
        (data) => {
          this.temp = data.temp;
          this.humedad = data.humedad;
          this.indCal = data.indCal;
          this.humedadsuelo = data.humedadsuelo;
          this.lux = data.lux;
          this.ventilacion = !!data.ventilacion;
          this.lampara = !!data.lampara;
          this.riego = !!data.riego;
          this.updateCircles();
          this.errorcard = ''
        },
        (err) => {
          this.displayError(err)
          intervalo.unsubscribe()
        }
      )
    })
  }
  
  async displayError(err: HttpErrorResponse): Promise<void> {
    console.log(err);
    let errorcode: Number = err.status;
    let error: string = ''
    switch(errorcode) {
      case 0:
        error = 'Error al conectar con el servidor backend';
        break;
      case 404:
        error = 'Error al conectar con el servidor backend';
        break;
      case 401:
        error = 'Error al conectar con el invernadero';
        break;
      default:
        error = 'Error desconocido: \n' + err.message;
    }
    const alert = await this.alertController.create({
      cssClass: 'errorAlert',
      header: 'Error',
      message: error,
      buttons: [{
        text: 'Ok',
        role: 'Ok',
        handler: () => {this.errorcard = error}
      }]
    });
    await alert.present();
    await alert.onDidDismiss();
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

  public valores: Valores = {
    hsluz: -2,
    riego: -2,
    ventilacion: -2
  }

  public nuevosValores: Valores = {
    hsluz: -2,
    riego: -2,
    ventilacion: -2
  }

  public reloadValues() {
    this.dataService.getVal().subscribe(
      data => {
        this.valores.hsluz = data[0].hsluz;        
        this.valores.riego = data[0].riego;
        this.valores.ventilacion = data[0].ventilacion;

        this.nuevosValores.hsluz = data[0].hsluz;        
        this.nuevosValores.riego = data[0].riego;
        this.nuevosValores.ventilacion = data[0].ventilacion;

        this.isOptionsDisabled = false;
      }
    );
  }

  public isOptionsDisabled: boolean = true;
  
  public updateValues() {
    if(this.valores.hsluz != this.nuevosValores.hsluz || this.valores.riego != this.nuevosValores.riego || this.valores.ventilacion != this.nuevosValores.ventilacion) {
      this.dataService.modificarVal(this.valores).subscribe(
        res => {
          this.displaySuccess('Valores modificados correctamente');
          this.valores = this.nuevosValores;
        },
        err => {
          if(err.status == 404 || err.status == 0) {
            this.displayErrorMsg('Error al conectar con el backend');
          }
          else if(err.status == 401) {
            this.displaySuccess('Los valores se actualizaron, pero no hay conexión con el invernadero');
            this.valores = this.nuevosValores;
          }
          else {
            this.displayError(err);
          }
        }
      )
    }
    else {
      this.displayErrorMsg('Debes editar al menos un valor');
    }
  }


}
