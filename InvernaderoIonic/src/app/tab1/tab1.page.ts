import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private dataService:DataService) {}

  public temp: Number;
  public humedad: Number;
  public indCal: Number;
  public humedadsuelo: Number;
  public lux: Number;
  public ventilacion: boolean;
  public lampara: boolean;
  public riego: boolean;

  ngOnInit(): void {
    this.dataService.getLastData().subscribe(data => {
      this.temp = data.temp;
      this.humedad = data.humedad;
      this.indCal = data.indCal;
      this.humedadsuelo = data.humedadsuelo;
      this.lux = data.lux;
      this.ventilacion = !!data.ventilacion;
      this.lampara = !!data.lampara;
      this.riego = !!data.riego;
    })
  }

}
