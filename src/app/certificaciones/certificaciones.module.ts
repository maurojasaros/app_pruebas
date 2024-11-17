import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CertificacionesRoutingModule } from './certificaciones-routing.module';  // Asegúrate de que este archivo sea correcto
import { CertificacionesComponent } from './certificaciones.component';  // El componente que creaste

@NgModule({
  declarations: [CertificacionesComponent],  // Asegúrate de que este sea el componente correcto
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CertificacionesRoutingModule  // Asegúrate de que el routing module también sea correcto
  ],
  exports: [CertificacionesComponent]
})
export class CertificacionesModule {}
