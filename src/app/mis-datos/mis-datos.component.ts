import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service'; // Importar tu servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
export class MisDatosComponent implements OnInit {
  userData: any = {};

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('MisDatosComponent cargado');
  this.loadUserData();
  }

  async loadUserData() {
    try {
      const email = await this.authService.getActiveUserEmail();
      if (email) {
        this.userData = await this.authService.getUserData(email);
      } else {
        console.error('No hay usuario activo');
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario', error);
    }
  }

  async updateData() {
    const email = await this.authService.getActiveUserEmail();
    if (email) {
      const { nombre, apellido, direccion, calle, ciudad, fecha_nacimiento } = this.userData;
      const success = await this.authService.updateUserData(email, nombre, apellido, direccion, calle, ciudad, fecha_nacimiento);
      if (success) {
        console.log('Datos actualizados con éxito');
      } else {
        console.error('Error al actualizar los datos');
      }
    }
  }
}
