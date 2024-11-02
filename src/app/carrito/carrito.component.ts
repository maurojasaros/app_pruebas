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
  items: { titulo: string; precio: number; imagen: string }[] = [];

  constructor() {}

  ngOnInit() {
    // Cargar el carrito desde localStorage
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.items = JSON.parse(carritoGuardado);
    }
  }

  addToCart(juego: any) {
    this.items.push(juego);
    console.log(`Añadido al carrito: ${juego.titulo}`);
  
    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('carrito'); // Limpiar también el localStorage
    console.log("Carrito vaciado");
  }

  getCartItems() {
    return this.items;
  }
}

