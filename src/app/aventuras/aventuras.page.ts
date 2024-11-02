import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CarritoComponent } from '../carrito/carrito.component'; // Ajusta la ruta según tu estructura de archivos
import { FavoritosComponent } from '../favoritos/favoritos.component';

@Component({
  selector: 'app-aventuras',
  templateUrl: './aventuras.page.html',
  styleUrls: ['./aventuras.page.scss'],
})
export class AventurasPage implements OnInit {
  @ViewChild(CarritoComponent) carritoComponent!: CarritoComponent; // Obtener la referencia al componente del carrito
  @ViewChild(FavoritosComponent) favoritosComponent!: FavoritosComponent; // Obtener la referencia al componente de favoritos

  // Array de juegos
  juegos: { titulo: string; precio: number; descripcion: string; imagen: string }[] = [
    {
      titulo: 'Mario Bros',
      precio: 29990,
      descripcion: 'Rescata a la princesa junto a tus compañeros Luigi y Yoshi, enfretate a los enemigos y supera todas las adversidades.',
      imagen: 'assets/img/Mario Bros.jpg'
    },
    {
      titulo: 'The Legend of Zelda',
      precio: 59990,
      descripcion: 'Adentrate en Hirule y su entorno, enfrentate a distintos jefes y equipate bien para tu aventura. En esta ocasión puedes escalar!!.',
      imagen: 'assets/img/The Legend of Zelda.jpg'
    }
  ];

  // Lista de juegos favoritos
  favoritos: { titulo: string; precio: number; imagen: string }[] = [];

  constructor(
    private menu: MenuController
  ) { }

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
