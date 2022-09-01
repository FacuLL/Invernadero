import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../Services/data.service';
import { TabsPage } from '../tabs/tabs.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private alertController:AlertController, private tabs: TabsPage, private dataService: DataService) {}

  ngOnInit() {

  }

  async presentInfoAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Valores',
      message: 
      `Ventilación:<br>
      - Baja: 6 intervalos de 20 minutos al día<br>
      - Media: 12 intervalos de 20 minutos al día<br>
      - Alta: 24 intervalos de 20 minutos al día<br>
      Riego:<br>
      - Bajo: se activa cuando la humedad del suelo baja de 55%<br>
      - Medio: cuando baja de 65%<br>
      - Alto: cuando baja de 75%<br>
      Iluminación:<br>
      - Baja: cuando no se alcanzaron las 9 horas de luz<br>
      - Media: cuando no se alcanzaron las 10,5 horas<br>
      - Alta: cuando no se alcanzaron las12 horas<br>
    `,
      buttons: ['OK']
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  public onSelectChange(e, varName) {
    this.tabs.valores[varName] = e.detail.value;
    console.log(this.tabs.valores[varName]);
    console.log(this.tabs.nuevosValores[varName]);
  }

  public async changeBackend() {
    const alert = await this.alertController.create({
      cssClass: 'changeBackendAlert',
      header: 'Cambiar IP Backend',
      inputs: [{
            name: 'newip',
            type: 'text',
            placeholder: 'Nueva IP',
            value: this.dataService.getURL()
        }],
      buttons: [{
          text: 'Cancelar',
          role: 'Cancel'
        },
        {
        text: 'Cambiar',
        handler: (alertData) => {this.dataService.setURL(alertData.newip)}
      }],
      backdropDismiss: false
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
