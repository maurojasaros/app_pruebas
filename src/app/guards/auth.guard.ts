import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isSessionActive().then((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        return true;  // Si el usuario está autenticado, permite el acceso a la ruta
      } else {
        // Si no está autenticado, redirige a login y pasa la URL actual para redirigir después
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }).catch((error) => {
      console.error('Error al verificar la sesión activa:', error);
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });  // En caso de error, redirige a login
      return false;
    });
  }
}
