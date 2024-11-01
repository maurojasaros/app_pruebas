import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

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
  //fechaNacimiento: string = '';
  isAnimating: boolean = false;
  selectedDate: any = '';

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.menu.close("mainMenu");
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email']; 
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
    this.isAnimating = true; // Activa la animación
    setTimeout(() => {
      this.nombre = '';
      this.apellido = '';
      this.nivelEducacion = '';
      this.direccion = '';
      this.calle = '';
      this.ciudad = '';
      this.selectedDate = '';
      this.isAnimating = false; // Desactiva la animación
    }, 1000); // Duración de la animación
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
      // Puedes añadir más opciones si lo deseas
    };
    return new Date(date).toLocaleDateString('es-CL', options); // Formato de Chile
  }


  // Método para calcular la edad
  calcularEdad(fechaNacimiento: Date): number {
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mesNacimiento = fechaNacimiento.getMonth();
  const mesActual = hoy.getMonth();

  // Si el cumpleaños de este año no ha pasado aún, restamos un año
  if (mesNacimiento > mesActual || (mesNacimiento === mesActual && fechaNacimiento.getDate() > hoy.getDate())) {
    edad--;
  }
  
  return edad;
}



  // Método para guardar datos
  guardar() {
  console.log("Método guardar() llamado");
  if (
    this.nombre.trim() === '' || 
    this.apellido.trim() === '' || 
    this.nivelEducacion.trim() === '' || 
    this.direccion.trim() === '' || 
    this.calle.trim() === '' || 
    this.ciudad.trim() === '' || 
    !this.selectedDate
  ) {
    this.presentAlert('Error: Todos los campos deben estar llenos');
  } else {
    // Verificar edad
    const fechaNacimiento = new Date(this.selectedDate);
    const edad = this.calcularEdad(fechaNacimiento);
    
    if (edad < 18) {
      this.presentAlert('Error: Debes tener al menos 18 años');
    } else {
      const nombreCompleto = `${this.nombre} ${this.apellido}`;
      const fechaNacimientoFormateada = this.formatDate(this.selectedDate);
      this.presentAlert(`Datos Correctos: usuario: ${nombreCompleto} fecha nacimiento: ${fechaNacimientoFormateada}`);
    }
  }
}}