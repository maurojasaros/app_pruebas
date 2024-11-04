import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CarritoComponent } from './carrito/carrito.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

const routes: Routes = [
  {
    
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'terror',
    loadChildren: () => import('./terror/terror.module').then( m => m.TerrorPageModule)
  },
  {
    path: 'deportes',
    loadChildren: () => import('./deportes/deportes.module').then( m => m.DeportesPageModule)
  },
  {
    path: 'aventuras',
    loadChildren: () => import('./aventuras/aventuras.module').then( m => m.AventurasPageModule)
  },
  
  { path: 'carrito', component: CarritoComponent },
  { path: 'favoritos', component: FavoritosComponent },
  {
    path: 'lista-juegos',
    loadChildren: () => import('./lista-juegos/lista-juegos.module').then( m => m.ListaJuegosPageModule)
  },
  {
    path: 'acerca-de-nosotros',
    loadChildren: () => import('./acerca-de-nosotros/acerca-de-nosotros.module').then( m => m.AcercaDeNosotrosPageModule)
  },
  { path: 'acerca-de-nosotros', loadChildren: () => import('./acerca-de-nosotros/acerca-de-nosotros.module').then(m => m.AcercaDeNosotrosPageModule) },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
