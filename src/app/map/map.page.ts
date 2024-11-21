import { Component, OnInit } from '@angular/core';
import { Geolocation, PermissionStatus } from '@capacitor/geolocation';
import { MenuController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Importamos DomSanitizer

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  latitude: number = 0; // Inicializar en 0
  longitude: number = 0; // Inicializar en 0
  mapSrc: SafeResourceUrl = ''; // Aquí guardamos la URL para el iframe

  constructor(
    private menu: MenuController,
    private sanitizer: DomSanitizer // Usamos DomSanitizer para evitar problemas de seguridad con la URL
  ) {}

  ngOnInit() {
    this.menu.close("mainMenu");
    this.getLocationAndShowOnMap();
  }

  // Obtener la ubicación y mostrarla en el mapa
  async getLocationAndShowOnMap() {
    try {
      // Verificar permisos de ubicación
      const permissions: PermissionStatus = await Geolocation.checkPermissions();
      console.log('Permisos de ubicación:', permissions); // Log para verificar permisos

      if (permissions.location !== 'granted') {
        const requestPermissions = await Geolocation.requestPermissions();
        if (requestPermissions.location !== 'granted') {
          alert('Permiso de ubicación denegado');
          return;
        }
      }

      // Obtener la ubicación con la mayor precisión posible
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true, // Asegúrate de que la precisión sea la más alta posible
        timeout: 10000, // Timeout de 10 segundos para obtener la ubicación
      });

      console.log('Coordenadas obtenidas:', position.coords); // Log para mostrar las coordenadas

      // Verificar que las coordenadas sean válidas
      if (position.coords.latitude && position.coords.longitude) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(`Coordenadas actualizadas: Latitud: ${this.latitude}, Longitud: ${this.longitude}`);
      } else {
        alert('No se pudo obtener una ubicación precisa.');
        return;
      }

      // Llamar a la función para actualizar el mapa con las nuevas coordenadas
      this.updateMap();
    } catch (error) {
      alert('Error al obtener la ubicación: ' + error);
      console.error('Error al obtener la ubicación:', error); // Log para depurar el error
    }
  }

  // Actualizar la URL del mapa con las coordenadas
  updateMap() {
    const mapUrl = `https://www.google.com/maps?q=${this.latitude},${this.longitude}&output=embed`;

    console.log('URL del mapa:', mapUrl); // Log para verificar la URL

    // Usamos el sanitizer para asegurarnos de que la URL es segura
    this.mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
  }
}

