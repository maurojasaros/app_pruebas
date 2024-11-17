// src/app/acerca-de-nosotros/acerca-de-nosotros.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';  // Importar tu servicio
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-acerca-de-nosotros',
  templateUrl: './acerca-de-nosotros.page.html',
  styleUrls: ['./acerca-de-nosotros.page.scss'],
})
export class AcercaDeNosotrosPage implements OnInit {
  userData: any = {};  // Datos del usuario

  constructor(
    private menu: MenuController,
    private navController: NavController,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('AcercaDeNosotrosPage cargado');
    this.loadUserData();  // Cargar los datos del usuario al iniciar la página
    this.menu.close("mainMenu");
  }


  goBack() {
    this.navController.pop();
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }

  // Cargar los datos del usuario
  async loadUserData() {
    try {
      const email = await this.authService.getActiveUserEmail();
      console.log('Email del usuario activo:', email);  // Obtener el email del usuario activo
      if (email) {
        this.userData = await this.authService.getUserData(email);  // Obtener los datos del usuario por email
        console.log('Datos del usuario cargados:', this.userData);
      } else {
        console.error('No hay usuario activo');
        this.router.navigate(['/login']);  // Redirigir a login si no hay sesión activa
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario', error);
    }
  }
}
