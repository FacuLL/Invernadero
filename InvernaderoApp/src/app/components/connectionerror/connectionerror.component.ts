import { Component, OnInit } from '@angular/core';
import { TabsPage } from 'src/app/tabs/tabs.page';

@Component({
  selector: 'app-connectionerror',
  templateUrl: './connectionerror.component.html',
  styleUrls: ['./connectionerror.component.scss'],
})
export class ConnectionerrorComponent implements OnInit {

  constructor(private tabs: TabsPage) { }

  ngOnInit() {}

}
