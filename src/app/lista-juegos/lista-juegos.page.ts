import { Component, OnInit } from '@angular/core';
import { DeportesPage } from '../deportes/deportes.page';
import { AventurasPage } from '../aventuras/aventuras.page';
import { TerrorPage } from '../terror/terror.page';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.page.html',
  styleUrls: ['./lista-juegos.page.scss'],
})
export class ListaJuegosPage implements OnInit {
  juegos: { titulo: string; precio: number; descripcion: string; imagen: string }[] = [];
  searchTerm: string = '';

  constructor() {}

  ngOnInit() {
    // Unir todos los juegos en un solo array
    this.juegos = [
      ...DeportesPage.juegos,
      ...AventurasPage.juegos,
      ...TerrorPage.juegos,
      {
        titulo: 'Super Mario Bros',
        precio: 19900,
        descripcion: 'Un clásico de plataformas.',
        imagen: 'url-de-la-imagen' // Asegúrate de tener una URL válida para la imagen
      }
    ];
  }

  filterJuegos() {
    // Filtra los juegos según el término de búsqueda
    return this.juegos.filter(juego =>
      juego.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      juego.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  }

