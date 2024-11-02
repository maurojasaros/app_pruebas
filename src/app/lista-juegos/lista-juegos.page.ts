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

  constructor() {}

  ngOnInit() {
    // Unir todos los juegos en un solo array
    this.juegos = [
      ...DeportesPage.juegos,
      ...AventurasPage.juegos,
      ...TerrorPage.juegos
    ];

    console.log(this.juegos); // Muestra todos los juegos combinados en la consola
  }
}
