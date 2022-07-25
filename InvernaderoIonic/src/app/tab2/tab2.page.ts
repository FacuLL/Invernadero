import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private alertController:AlertController, private tabs: TabsPage) {}

  ngOnInit() {

  }

  async presentInfoAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Valores',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  public onSelectChange(e, varName) {
    this.tabs.valores[varName] = e.detail.value;
  }
}
