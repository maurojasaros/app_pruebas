import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CarritoComponent } from './carrito/carrito.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { MisDatosComponent } from './mis-datos/mis-datos.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { AuthGuard } from './guards/auth.guard';  // Si tienes algún guard de autenticación
import { ErrorPage } from './error/error.page';


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
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'terror',
    loadChildren: () => import('./terror/terror.module').then( m => m.TerrorPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'deportes',
    loadChildren: () => import('./deportes/deportes.module').then( m => m.DeportesPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'aventuras',
    loadChildren: () => import('./aventuras/aventuras.module').then( m => m.AventurasPageModule),
    canActivate: [AuthGuard] 
  },
  
  { 
    path: 'carrito', 
    component: CarritoComponent,
    canActivate: [AuthGuard]  // Protege el acceso al carrito si es necesario
  },
  { 
    path: 'favoritos', 
    component: FavoritosComponent,
    canActivate: [AuthGuard]  // Protege los favoritos si es necesario
  },
  {
    path: 'lista-juegos',
    loadChildren: () => import('./lista-juegos/lista-juegos.module').then( m => m.ListaJuegosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'acerca-de-nosotros',
    loadChildren: () => import('./acerca-de-nosotros/acerca-de-nosotros.module').then( m => m.AcercaDeNosotrosPageModule),
    canActivate: [AuthGuard]
  },
  
  {
    path: 'mis-datos',
    loadChildren: () => import('./mis-datos/mis-datos.module').then(m => m.MisDatosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'certificados',
    loadChildren: () => import('./certificaciones/certificaciones.module').then(m => m.CertificacionesModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'experiencia-laboral',
    loadChildren: () => import('./experiencia-laboral/experiencia-laboral.module').then(m => m.ExperienciaLaboralModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'trivia',
    loadChildren: () => import('./trivia/trivia.module').then( m => m.TriviaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'camara',
    loadChildren: () => import('./camara/camara.module').then( m => m.CamaraPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },
  // Comodín para rutas no válidas
  {
    path: '**',
    redirectTo: 'error',
    pathMatch: 'full'
  }
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
