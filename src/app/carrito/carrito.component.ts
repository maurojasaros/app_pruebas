import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CarritoComponent implements OnInit {
  items: { titulo: string; precio: number; imagen: string }[] = []; // Aquí almacenaremos los juegos añadidos al carrito

  constructor() {}

  ngOnInit() {}

  // Método para añadir un juego al carrito
  addToCart(juego: any) {
    this.items.push(juego);
    console.log(`Añadido al carrito: ${juego.titulo}`);
  }

  // Método para obtener los juegos en el carrito
  getCartItems() {
    return this.items;
  }

  // Método para limpiar el carrito
  clearCart() {
    this.items = [];
    console.log("Carrito vaciado");
  }
}
