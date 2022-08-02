import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { ConnectionerrorComponent } from '../components/connectionerror/connectionerror.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    NgCircleProgressModule
  ],
  declarations: [Tab1Page, ConnectionerrorComponent]
})
export class Tab1PageModule {}
