import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { ConfiguracionComponent } from './Components/configuracion/configuracion.component';
import { DatosComponent } from './Components/datos/datos.component';

const routes: Routes = [
  { path: '', component:  MainComponent},
  { path: 'configurar', component:  ConfiguracionComponent},
  { path: 'datos', component:  DatosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
