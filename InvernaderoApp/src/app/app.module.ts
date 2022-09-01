import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoconfigComponent } from './components/infoconfig/infoconfig.component';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { Filesystem } from '@capacitor/filesystem';

import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
    declarations: [AppComponent, InfoconfigComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(),
        NgCircleProgressModule.forRoot({
            "radius": 100,
            "space": 5,
            "outerStrokeGradient": true,
            "outerStrokeWidth": 10,
            "outerStrokeColor": "#ff0f0f",
            "outerStrokeGradientStopColor": "#ff5252",
            "innerStrokeColor": "#595959",
            "innerStrokeWidth": 10,
            "title": "UI",
            "titleColor": "#dedede",
            "titleFontSize": "27",
            "subtitleFontSize": "16",
            "animateTitle": false,
            "animationDuration": 1000,
            "showUnits": false,
            "showBackground": false,
            "clockwise": false,
            "startFromZero": true,
            "lazy": false,
            "renderOnClick": false
        })],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule {}
