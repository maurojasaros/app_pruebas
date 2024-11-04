import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule]
})
export class GameCardComponent {
  @Input() juego!: { titulo: string; precio: number; descripcion: string; imagen: string };
  @Input() mostrarBotones: boolean = true;
  @Input() mostrarPrecio: boolean = true;
  @Input() redireccionar: boolean = false;
  @Input() rutaRedireccion: string | string[] | undefined;

  @Output() agregarAFavoritos = new EventEmitter<void>();
  @Output() agregarAlCarrito = new EventEmitter<void>();
  
  constructor(private router: Router) {}
  
  onAgregarAFavoritos() {
    this.agregarAFavoritos.emit();
    console.log(`Juego añadido a favoritos: ${this.juego.titulo}`);
  }

  onAgregarAlCarrito() {
    this.agregarAlCarrito.emit();
    console.log(`Juego añadido al carrito: ${this.juego.titulo}`);
  }

  onCardClick() {
    if (this.redireccionar && this.rutaRedireccion) {
      // Verifica si rutaRedireccion es un string y navega directamente a esa ruta
      const route = Array.isArray(this.rutaRedireccion) ? this.rutaRedireccion[0] : this.rutaRedireccion;
      this.router.navigate([route]);
    }
  }
}
