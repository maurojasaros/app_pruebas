import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperienciaLaboralComponent } from './experiencia-laboral.component';  // Asegúrate de importar el componente correcto

const routes: Routes = [
  {
    path: '',
    component: ExperienciaLaboralComponent  // Este es el componente que se mostrará cuando se navegue a esta ruta
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Carga perezosa (lazy loading)
  exports: [RouterModule]
})
export class ExperienciaLaboralRoutingModule { }

