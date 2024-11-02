import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {
  @Input() juego!: { titulo: string; precio: number; descripcion: string; imagen: string };

  @Output() agregarAFavoritos = new EventEmitter<void>();
  @Output() agregarAlCarrito = new EventEmitter<void>(); // Nuevo EventEmitter para agregar al carrito

  onAgregarAFavoritos() {
    this.agregarAFavoritos.emit();
    console.log(`Juego añadido a favoritos: ${this.juego.titulo}`);
  }

  onAgregarAlCarrito() {
    this.agregarAlCarrito.emit();
    console.log(`Juego añadido al carrito: ${this.juego.titulo}`);
  }
}
