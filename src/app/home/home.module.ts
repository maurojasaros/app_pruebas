import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
// Importa los módulos de Angular Material que necesitas
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LogoComponentComponent } from '../logo-component/logo-component.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { MisDatosComponent } from '../mis-datos/mis-datos.component'; 
import { CertificacionesComponent } from '../certificaciones/certificaciones.component'; 
import { ExperienciaLaboralComponent } from '../experiencia-laboral/experiencia-laboral.component'; 



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LogoComponentComponent,
    GameCardComponent
    
  ],
  declarations: [HomePage, MisDatosComponent, CertificacionesComponent, ExperienciaLaboralComponent],
})
export class HomePageModule {}
