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

import { CertificacionesComponent } from '../certificaciones/certificaciones.component'; 
import { ExperienciaLaboralComponent } from '../experiencia-laboral/experiencia-laboral.component'; 
import { AuthServiceService } from '../services/auth-service.service';
import { MisDatosModule } from '../mis-datos/mis-datos.module';


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
    GameCardComponent,
    MisDatosModule
    
  ],
  declarations: [HomePage, CertificacionesComponent, ExperienciaLaboralComponent],
  providers: [AuthServiceService],
})
export class HomePageModule {}
