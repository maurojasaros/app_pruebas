import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CarritoComponent } from '../carrito/carrito.component'; // Ajusta la ruta según tu estructura de archivos
import { FavoritosComponent } from '../favoritos/favoritos.component';


@Component({
  selector: 'app-terror',
  templateUrl: './terror.page.html',
  styleUrls: ['./terror.page.scss'],
})
export class TerrorPage implements OnInit {
  @ViewChild(CarritoComponent) carritoComponent!: CarritoComponent; // Obtener la referencia al componente del carrito
  @ViewChild(FavoritosComponent) favoritosComponent!: FavoritosComponent; // Obtener la referencia al componente de favoritos

  static juegos = [
    {titulo: 'Outlast', precio: 19990, descripcion: 'Outlast es un juego de terror en primera persona donde un periodista investiga un asilo psiquiátrico lleno de horrores.', imagen: 'assets/img/Outlast.jpg'},
    { titulo: 'Dead Space', precio: 79990, descripcion: 'Dead Space sigue a Isaac Clarke, un ingeniero que lucha contra criaturas monstruosas en una nave espacial infestada.', imagen: 'assets/img/Dead Space.jpg'}
    // otros juegos...
  ];

  // Array de juegos
  juegos: { titulo: string; precio: number; descripcion: string; imagen: string }[] = [
    { titulo: 'Outlast', precio: 19990, descripcion: 'Outlast es un juego de terror en primera persona donde un periodista investiga un asilo psiquiátrico lleno de horrores.', imagen: 'assets/img/Outlast.jpg'},
    { titulo: 'Dead Space', precio: 79990, descripcion: 'Dead Space sigue a Isaac Clarke, un ingeniero que lucha contra criaturas monstruosas en una nave espacial infestada.', imagen: 'assets/img/Dead Space.jpg'}
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