import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritosComponent } from '../favoritos/favoritos.component'; // Asegúrate que esta ruta sea correcta

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true, // Esto está bien
  imports: [FavoritosComponent] // Esto también está bien
})
export class TabsPage {
  juegos = [
    { titulo: 'Juego 1', precio: 10, imagen: 'ruta/a/la/imagen1.jpg', descripcion: 'Descripción del Juego 1' },
    { titulo: 'Juego 2', precio: 20, imagen: 'ruta/a/la/imagen2.jpg', descripcion: 'Descripción del Juego 2' },
  ];

  constructor(private router: Router) {}

  verFavoritos() {
    this.router.navigate(['/favoritos']);
  }

  verCarrito() {
    this.router.navigate(['/carrito']);
  }
}
