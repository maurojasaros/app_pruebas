import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CarritoComponent } from '../carrito/carrito.component'; // Ajusta la ruta según tu estructura de archivos
import { FavoritosComponent } from '../favoritos/favoritos.component';

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.page.html',
  styleUrls: ['./deportes.page.scss'],
})
export class DeportesPage implements OnInit {
  @ViewChild(CarritoComponent) carritoComponent!: CarritoComponent; // Obtener la referencia al componente del carrito
  @ViewChild(FavoritosComponent) favoritosComponent!: FavoritosComponent; // Obtener la referencia al componente de favoritos

  // Array de juegos
  juegos: { titulo: string; precio: number; descripcion: string; imagen: string }[] = [
    {
      titulo: 'FIFA 2023',
      precio: 39990,
      descripcion: 'Disfruta de la experiencia más realista del fútbol con FIFA 2023, donde cada partido cuenta y cada jugador tiene su propio estilo.',
      imagen: 'assets/img/Fifa 2023.jpg'
    },
    {
      titulo: 'UFC',
      precio: 39990,
      descripcion: 'Enfréntate a los mejores luchadores del mundo en UFC. Experimenta la emoción de las artes marciales mixtas como nunca antes.',
      imagen: 'assets/img/ufc.jpg'
    }
  ];

  // Lista de juegos favoritos
  favoritos: { titulo: string; precio: number; imagen: string }[] = [];

  constructor(private menu: MenuController) { }

  ngOnInit() {
    // Cargar el carrito desde localStorage
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      this.carritoComponent.items = JSON.parse(storedCart);
    }
    
    // Cargar los favoritos desde localStorage
    const storedFavorites = localStorage.getItem('favoritos');
    if (storedFavorites) {
      this.favoritos = JSON.parse(storedFavorites);
    }
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }

  agregarAlCarrito(juego: any) {
    if (this.carritoComponent) {
      this.carritoComponent.addToCart(juego); // Añadir el juego al carrito a través del componente
      console.log(`Juego añadido al carrito: ${juego.titulo}`);
      
      // Guardar el carrito en localStorage
      localStorage.setItem('carrito', JSON.stringify(this.carritoComponent.items));
    }
  }

  agregarAFavoritos(juego: any) {
    const existe = this.favoritos.some(item => item.titulo === juego.titulo);
    if (!existe) {
      this.favoritos.push({
        titulo: juego.titulo,
        precio: juego.precio,
        imagen: juego.imagen
      });
      console.log(`Juego añadido a favoritos: ${juego.titulo}`);
    } else {
      console.log(`El juego ya está en favoritos: ${juego.titulo}`);
    }

    // Guardar favoritos en localStorage
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }
}
