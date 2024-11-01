import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: string = '';
  isAnimating: boolean = false;

  // Array de productos (drones)
  productos = [
    { nombre: 'Outlast', precio: 20.999, enStock: true },
    { nombre: 'Final Fantasy XII', precio: 30.999, enStock: false },
    { nombre: 'The legend of Zelda', precio: 49.699, enStock: true },
    { nombre: 'UFC', precio: 15.999, enStock: false },
    { nombre: 'Call of Duty', precio: 10.799, enStock: true }
  ];

  constructor(private route: ActivatedRoute, private alertController: AlertController) {}

  ngOnInit() {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email']; 
    });
  }

  // Método para mostrar alerta con la información del usuario
  async mostrarInformacion() {
    const alert = await this.alertController.create({
      header: 'Información del Usuario',
      //message: `Nombre: ${this.nombre}<br>Apellido: ${this.apellido}`,
      message: `Su nombre es: ${this.nombre} ${this.apellido}`,
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
    this.fechaNacimiento = '';
    this.isAnimating = false; // Desactiva la animación
  }, 1000); // Duración de la animación
}

// Método para mostrar alerta sobre el stock del producto
async mostrarAlerta(producto: any) {
  const alert = await this.alertController.create({
    header: 'Estado del Juego',
    message: producto.enStock ? 'El Juego está en stock' : 'El Juego no está en stock',
    buttons: ['OK']
  });
  await alert.present();
}
}