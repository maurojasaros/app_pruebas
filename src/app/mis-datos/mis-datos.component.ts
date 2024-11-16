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
    this.loadUserData();
  }

  async loadUserData() {
    const email = 'mao@gmail.com'; // Aquí deberías obtener el email del usuario logueado
    this.userData = await this.authService.getUserData(email);
  }

  async updateData() {
    const email = 'mao@gmail.com'; // Aquí deberías obtener el email del usuario logueado
    const { nombre, apellido, direccion, calle, ciudad, fecha_nacimiento } = this.userData;
    const success = await this.authService.updateUserData(
      email, nombre, apellido, direccion, calle, ciudad, fecha_nacimiento
    );
    if (success) {
      console.log('Datos actualizados con éxito');
      // Redirigir a otra página si es necesario
    } else {
      console.error('Error al actualizar los datos');
    }
  }
}
