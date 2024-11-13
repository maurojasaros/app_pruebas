import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthServiceService
  ) { }

  ngOnInit() {
    // Verificar si el usuario ya está logueado al cargar la página
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/home']);
    }
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }

  // Método para mostrar alerta de error
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Función para validar el formato del email
  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica para validar email
    return emailRegex.test(email);
  }
  
  // Método para el login
  async login() {
    // Verificar que el campo de correo no esté vacío
    if (!this.email) {
      this.mostrarAlerta('El campo de correo no puede estar vacío.');
      return;
    }

    // Validar el formato del correo
    if (!this.validarEmail(this.email)) {
      this.mostrarAlerta('El formato del correo es inválido.');
      return;
    }

    // Verificar que la contraseña no esté vacía
    if (!this.password) {
      this.mostrarAlerta('El campo de contraseña no puede estar vacío.');
      return;
    }

    // Validar la longitud de la contraseña
    if (this.password.length > 4) {
      this.mostrarAlerta('La contraseña no puede tener más de 4 caracteres.');
      return;
    }

    // Llamar al servicio para validar el login
    const isValidLogin = await this.authService.loginUser(this.email, this.password);

    if (isValidLogin) {
      // Si el login es exitoso, guardar los datos de sesión
      sessionStorage.setItem('userEmail', this.email); // Guardar el email
      sessionStorage.setItem('isLoggedIn', 'true');    // Indicador de sesión activa

      // Navegar a la página de inicio
      this.navCtrl.navigateForward(['/home']);
    } else {
      // Si no es válido, muestra un mensaje de error
      this.mostrarAlerta('Correo o contraseña incorrectos.');
    }
  }
}

