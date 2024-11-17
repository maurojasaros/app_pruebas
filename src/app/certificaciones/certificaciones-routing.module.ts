import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificacionesComponent } from './certificaciones.component';  // Asegúrate de que el nombre del componente sea correcto

const routes: Routes = [
  {
    path: '',
    component: CertificacionesComponent  // El componente que se muestra en esta ruta
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Esto establece el lazy loading para este módulo
  exports: [RouterModule]
})
export class CertificacionesRoutingModule {}