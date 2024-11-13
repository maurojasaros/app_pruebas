import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  email: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  direccion: string = '';
  calle: string = '';
  ciudad: string = '';
  selectedDate: any = '';
  password: string = '';
  isAnimating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private menu: MenuController,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.menu.close("mainMenu");
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email']; // Asumimos que el email es pasado desde el login
    });
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }

  // Método para mostrar alerta con la información del usuario
  async mostrarInformacion() {
    const alert = await this.alertController.create({
      header: 'Información del Usuario',
      message: `
        Su nombre es: ${this.nombre} ${this.apellido} <br>
        Nivel de Educación: ${this.nivelEducacion} <br>
        Dirección: ${this.direccion}, ${this.calle}, ${this.ciudad} <br>
        Fecha de Nacimiento: ${this.selectedDate}
      `,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para limpiar campos
  limpiarCampos() {
    this.isAnimating = true;
    setTimeout(() => {
      this.nombre = '';
      this.apellido = '';
      this.nivelEducacion = '';
      this.direccion = '';
      this.calle = '';
      this.ciudad = '';
      this.selectedDate = '';
      this.password = '';  // Limpiar también el campo de contraseña
      this.isAnimating = false;
    }, 1000);
  }

  // Método para mostrar alertas
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  formatDate(date: any): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('es-CL', options); // Formato de Chile
  }

  // Método para calcular la edad
  calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesNacimiento = fechaNacimiento.getMonth();
    const mesActual = hoy.getMonth();

    if (mesNacimiento > mesActual || (mesNacimiento === mesActual && fechaNacimiento.getDate() > hoy.getDate())) {
      edad--;
    }

    return edad;
  }

  // Método para guardar datos
  guardar() {
    console.log("Método guardar() llamado");

    // Verificación de campos vacíos
    if (
      this.nombre.trim() === '' || 
      this.apellido.trim() === '' || 
      this.nivelEducacion.trim() === '' || 
      this.direccion.trim() === '' || 
      this.calle.trim() === '' || 
      this.ciudad.trim() === '' || 
      !this.selectedDate ||
      this.password.trim() === ''  // Verificar que la contraseña no esté vacía
    ) {
      let errorMessage = '';
      if (this.nombre.trim() === '') errorMessage += 'Nombre, ';
      if (this.apellido.trim() === '') errorMessage += 'Apellido, ';
      if (this.nivelEducacion.trim() === '') errorMessage += 'Nivel de educación, ';
      if (this.direccion.trim() === '') errorMessage += 'Dirección, ';
      if (this.calle.trim() === '') errorMessage += 'Calle, ';
      if (this.ciudad.trim() === '') errorMessage += 'Ciudad, ';
      if (!this.selectedDate) errorMessage += 'Fecha de nacimiento, ';
      if (this.password.trim() === '') errorMessage += 'Contraseña';  // Mensaje si la contraseña está vacía

      this.presentAlert(`Error: Los siguientes campos están vacíos: ${errorMessage.slice(0, -2)}`);
      return; 
    }

    // Verificación de edad
    const fechaNacimiento = new Date(this.selectedDate);
    const edad = this.calcularEdad(fechaNacimiento);

    if (edad < 18) {
      this.presentAlert('Error: Debes tener al menos 18 años');
      return; 
    }

    // Llamada al servicio de autenticación para registrar el usuario
    this.authService.registerUser(
      this.nombre,
      this.apellido,
      this.email,  
      this.password,    // Ahora usamos la contraseña ingresada
      this.nivelEducacion,
      this.direccion,
      this.calle,
      this.ciudad,
      this.selectedDate
    ).then((success) => {
      if (success) {
        this.presentAlert('Registro exitoso');
        // Al registrar con éxito, puedes redirigir al login para que el usuario inicie sesión
      } else {
        this.presentAlert('Error al registrar usuario. Por favor, intenta de nuevo.');
      }
    }).catch((error) => {
      this.presentAlert(`Error inesperado: ${error.message}`);
    });
  }
}