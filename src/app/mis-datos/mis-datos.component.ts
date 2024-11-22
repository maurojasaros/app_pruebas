import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service'; // Importar tu servicio
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
export class MisDatosComponent implements OnInit, AfterViewChecked {
  userData: any = {};  // Datos del usuario

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log('MisDatosComponent cargado');
    this.loadUserData();  // Cargar los datos del usuario al iniciar el componente
  }

  ngAfterViewChecked() {
    // Este método se ejecuta después de cada ciclo de detección de cambios.
    // Puedes usarlo para verificar si los datos están siendo cargados y si la vista se ha actualizado.
    console.log('Vista después de la actualización: ', this.userData);
    // Si los datos están correctos, podrías también forzar la detección de cambios, aunque no debería ser necesario.
    // this.cdr.detectChanges();
  }

  // Método para convertir la fecha de nacimiento a formato YYYY-MM-DD
  formatFechaNacimiento(fecha: string): string {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Asegura que el mes tenga dos dígitos
    const day = String(date.getDate()).padStart(2, '0');  // Asegura que el día tenga dos dígitos
    return `${year}-${month}-${day}`;  // Devuelve la fecha en formato YYYY-MM-DD
  }

  // Cargar los datos del usuario
  async loadUserData() {
    try {
      const email = await this.authService.getActiveUserEmail();
      console.log('Email del usuario activo:', email);
      if (email) {
        this.userData = await this.authService.getUserData(email);  // Obtener los datos del usuario por email
        // Convertir la fecha de nacimiento al formato adecuado para el input de tipo date
        if (this.userData.fecha_nacimiento) {
          this.userData.fecha_nacimiento = this.formatFechaNacimiento(this.userData.fecha_nacimiento);
        }
        console.log('Datos del usuario cargados:', JSON.stringify(this.userData));
        setTimeout(() => {
          this.cdr.detectChanges();  // Forzar la detección de cambios para asegurar que la vista se actualice
        }, 0);
      } else {
        console.error('No hay usuario activo');
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario', error);
    }
  }

  // Actualizar los datos del usuario
  async updateData() {
    const email = await this.authService.getActiveUserEmail();  // Obtener el email del usuario activo
    if (email) {
      const { nombre, apellido, direccion, calle, ciudad, fecha_nacimiento } = this.userData;
      const success = await this.authService.updateUserData(email, nombre, apellido, direccion, calle, ciudad, fecha_nacimiento);
      if (success) {
        console.log('Datos actualizados con éxito');
      } else {
        console.error('Error al actualizar los datos');
      }
    } else {
      console.error('No hay usuario activo para actualizar');
    }
  }

   // Método para actualizar los datos del usuario
   updateUserData(email: string) {
    console.log('Actualizando los datos para el usuario con email:', email);

    // Aquí puedes hacer algo con el email, como cargar los datos del usuario
    // Ejemplo:
    this.authService.getUserData(email).then((data) => {
      this.userData = data;
      console.log('Datos del usuario cargados:', this.userData);
    }).catch((error) => {
      console.error('Error al cargar los datos del usuario', error);
    });
  }

  volverAtras() {
    this.navCtrl.back();  // Esto navega hacia atrás en el historial de navegación
  }
}
