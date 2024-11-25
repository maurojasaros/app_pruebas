import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CarritoComponent } from './carrito/carrito.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { MisDatosComponent } from './mis-datos/mis-datos.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';

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
  
  {
    path: 'mis-datos',
    loadChildren: () => import('./mis-datos/mis-datos.module').then(m => m.MisDatosModule)
  },
  {
    path: 'certificados',
    loadChildren: () => import('./certificaciones/certificaciones.module').then(m => m.CertificacionesModule)  // Aquí usamos loadChildren con el módulo CertificacionesModule
  },
  {
    path: 'experiencia-laboral',
    loadChildren: () => import('./experiencia-laboral/experiencia-laboral.module').then(m => m.ExperienciaLaboralModule)  // Aquí usamos loadChildren con el módulo ExperienciaLaboralModule
  },
  {
    path: 'trivia',
    loadChildren: () => import('./trivia/trivia.module').then( m => m.TriviaPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./camara/camara.module').then( m => m.CamaraPageModule)
  },
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
