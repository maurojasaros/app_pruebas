import { Component, OnInit } from '@angular/core';
import { Geolocation, PermissionStatus } from '@capacitor/geolocation';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(private menu: MenuController) { }

     // Coordenadas personalizadas
    latitude: number = -36.839481028609754; // Latitud de mi casa
    longitude: number = -73.00239062642865; // Longitud de mi casa
    
  ngOnInit() {
    this.menu.close("mainMenu");
    this.getLocationAndShowOnMap()
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }

  async getLocationAndShowOnMap() {
    try {
      // Verificar permisos
      const permissions: PermissionStatus = await Geolocation.checkPermissions();

      if (permissions.location !== 'granted') {
        const requestPermissions = await Geolocation.requestPermissions();
        if (requestPermissions.location !== 'granted') {
          alert('Permiso de ubicación denegado');
          return;
        }
      }

      // Obtener la ubicación
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      

      // Mostrar la ubicación en el mapa
      const mapFrame: HTMLIFrameElement | null = document.getElementById(
        'mapFrame'
      ) as HTMLIFrameElement;

      if (mapFrame) {
        mapFrame.src = `https://www.google.com/maps?q=${this.latitude},${this.longitude}&output=embed`;
      }
    } catch (error) {
      alert('Error al obtener la ubicación: '+error);
    }
  }

}