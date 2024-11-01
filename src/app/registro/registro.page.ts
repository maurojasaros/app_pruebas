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
  fechaNacimiento: string = '';
  isAnimating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private menu: MenuController
  ) {}

  ngOnInit() {
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

  // Método opcional para mostrar alerta sobre algún dato
  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Este es un mensaje de alerta relacionado con el registro.',
      buttons: ['OK']
    });
    await alert.present();
  }
}