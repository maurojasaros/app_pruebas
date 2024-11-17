import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ExperienciaLaboralComponent } from './experiencia-laboral.component';
import { ExperienciaLaboralRoutingModule } from './experiencia-laboral-routing.module';

@NgModule({
  declarations: [ExperienciaLaboralComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExperienciaLaboralRoutingModule
  ],
  exports: [ExperienciaLaboralComponent]
})
export class ExperienciaLaboralModule { }

