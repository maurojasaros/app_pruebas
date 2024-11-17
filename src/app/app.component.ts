import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular'; 
import { Router } from '@angular/router'
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController, private router: Router,private authService: AuthServiceService) {}

  async cerrarSesion() {
    try {
      console.log('Usted cerró sesión');
      await this.authService.logoutUser(); // Llama al método para cerrar sesión en la base de datos
      this.menu.close('mainMenu'); // Cierra el menú
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
