import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private alertController: AlertController) { }

  ngOnInit() {
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
  
  login() {
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
 
   // Verificar que la contraseña tenga máximo 4 caracteres
   if (this.password.length > 4) {
     this.mostrarAlerta('La contraseña no puede tener más de 4 caracteres.');
     return;
   }
 
   // Si todas las validaciones son correctas, navega a la página "home"
   this.navCtrl.navigateForward(['/home'], {
     queryParams: {
       email: this.email,
       password: this.password
     }
   });

}
}

