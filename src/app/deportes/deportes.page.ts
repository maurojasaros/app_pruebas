import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CarritoComponent } from '../carrito/carrito.component';
import { FavoritosComponent } from '../favoritos/favoritos.component';

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.page.html',
  styleUrls: ['./deportes.page.scss'],
})
export class DeportesPage implements OnInit {
  @ViewChild(CarritoComponent) carritoComponent!: CarritoComponent;
  @ViewChild(FavoritosComponent) favoritosComponent!: FavoritosComponent;

  static juegos = [
    { titulo: 'FIFA 23', precio: 40000, descripcion: 'Fútbol realista', imagen: 'assets/img/Fifa 2023.jpg' },
    { titulo: 'UFC', precio: 39990, descripcion: 'Experimenta las artes marciales mixtas con UFC.', imagen: 'assets/img/ufc.jpg' }
    // otros juegos...
  ];

  juegos: { titulo: string; precio: number; descripcion: string; imagen: string }[] = [
    { titulo: 'FIFA 2023', precio: 39990, descripcion: 'Disfruta del fútbol con FIFA 2023.', imagen: 'assets/img/Fifa 2023.jpg' },
    { titulo: 'UFC', precio: 39990, descripcion: 'Experimenta las artes marciales mixtas con UFC.', imagen: 'assets/img/ufc.jpg' }
  ];

  favoritos: { titulo: string; precio: number; imagen: string }[] = [];

  constructor(private menu: MenuController) { }

  ngOnInit() {
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
      this.carritoComponent.addToCart(juego);
      console.log(`Juego añadido al carrito: ${juego.titulo}`);
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
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    } else {
      console.log(`El juego ya está en favoritos: ${juego.titulo}`);
    }
  }
}
