import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { FavoritosComponent } from '../favoritos/favoritos.component'; // Asegúrate de importar el componente

const routes: Routes = [
  {
    path: '',
    component: TabsPage
  },
  {
    path: 'juegos',
    loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosPageModule)
  },
  {
    path: 'favoritos',
    component: FavoritosComponent // Usa el componente directamente
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
