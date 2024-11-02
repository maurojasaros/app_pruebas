import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaJuegosPage } from './lista-juegos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaJuegosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaJuegosPageRoutingModule {}
