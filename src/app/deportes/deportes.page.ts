import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CarritoComponent } from '../carrito/carrito.component'; // Ajusta la ruta según tu estructura de archivos

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.page.html',
  styleUrls: ['./deportes.page.scss'],
})
export class DeportesPage implements OnInit {
  @ViewChild(CarritoComponent) carritoComponent!: CarritoComponent; // Obtener la referencia al componente del carrito

  // Array de juegos
  juegos: { titulo: string; precio: number; descripcion: string; imagen: string }[] = [
    {
      titulo: 'FIFA 2023',
      precio: 39990,
      descripcion: 'Disfruta de la experiencia más realista del fútbol con FIFA 2023, donde cada partido cuenta y cada jugador tiene su propio estilo.',
      imagen: 'assets/img/Fifa 2023.jpg' // Asegúrate de que la imagen esté en esta ruta
    },
    {
      titulo: 'UFC',
      precio: 39990,
      descripcion: 'Enfréntate a los mejores luchadores del mundo en UFC. Experimenta la emoción de las artes marciales mixtas como nunca antes.',
      imagen: 'assets/img/ufc.jpg' // Asegúrate de que la imagen esté en esta ruta
    }
  ];

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }

  agregarAlCarrito(juego: any) {
    if (this.carritoComponent) {
      this.carritoComponent.addToCart(juego); // Añadir el juego al carrito a través del componente
      console.log(`Juego añadido al carrito: ${juego.titulo}`);
    }
  }
}
