import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service'; // Importar tu servicio
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
export class MisDatosComponent implements OnInit {
  userData: any = {};  // Datos del usuario

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('MisDatosComponent cargado');
    this.loadUserData();  // Cargar los datos del usuario al iniciar el componente
  }

  // Cargar los datos del usuario
  async loadUserData() {
    try {
      const email = await this.authService.getActiveUserEmail();
      console.log('Email del usuario activo:', email);  // Obtener el email del usuario activo
      if (email) {
        this.userData = await this.authService.getUserData(email);  // Obtener los datos del usuario por email
        console.log('Datos del usuario cargados:', JSON.stringify(this.userData));
        this.cdr.detectChanges();
      } else {
        console.error('No hay usuario activo');
        this.router.navigate(['/login']);  // Redirigir a login si no hay sesión activa
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario', error);
    }
  }

  // Actualizar los datos del usuario
  async updateData() {
    const email = await this.authService.getActiveUserEmail();  // Obtener el email del usuario activo
    if (email) {
      const { nombre, apellido, direccion, calle, ciudad } = this.userData;
      const success = await this.authService.updateUserData(email, nombre, apellido, direccion, calle, ciudad);
      if (success) {
        console.log('Datos actualizados con éxito');
      } else {
        console.error('Error al actualizar los datos');
      }
    } else {
      console.error('No hay usuario activo para actualizar');
    }
  }
}
