import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() juego!: { titulo: string; precio: number; descripcion: string; imagen: string }; // Define la propiedad de entrada

  constructor() { }

  ngOnInit() {}

  agregarAlCarrito() {
    // Lógica para agregar al carrito
    console.log(`Juego añadido al carrito: ${this.juego.titulo}`);
  }

  agregarAFavoritos() {
    // Lógica para agregar a favoritos
    console.log(`Juego añadido a favoritos: ${this.juego.titulo}`);
  }
}
