import { Component, ViewChild, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(private alertController: AlertController, private tabs: TabsPage) {}


  ngOnInit() {
    
  }

}
