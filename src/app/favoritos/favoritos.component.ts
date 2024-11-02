import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FavoritosComponent implements OnInit {
  @Input() favoritos: { titulo: string; precio: number; imagen: string }[] = [];

  ngOnInit() {
    const favoritosGuardados = localStorage.getItem('favoritos');
    if (favoritosGuardados) {
      this.favoritos = JSON.parse(favoritosGuardados);
    }
  }

  // Método para limpiar la lista de favoritos
  limpiarFavoritos() {
    this.favoritos = [];
    localStorage.removeItem('favoritos'); // Limpiar localStorage al limpiar favoritos
  }
}
