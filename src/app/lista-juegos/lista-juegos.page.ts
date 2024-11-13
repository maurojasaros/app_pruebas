import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DeportesPage } from '../deportes/deportes.page';
import { AventurasPage } from '../aventuras/aventuras.page';
import { TerrorPage } from '../terror/terror.page';
import { GameCardComponent } from '../game-card/game-card.component';
import { CarritoComponent } from '../carrito/carrito.component';
import { FavoritosComponent } from '../favoritos/favoritos.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.page.html',
  styleUrls: ['./lista-juegos.page.scss'],
})
export class ListaJuegosPage implements OnInit {
  @ViewChild(CarritoComponent) carritoComponent!: CarritoComponent;
  @ViewChild(FavoritosComponent) favoritosComponent!: FavoritosComponent;
  


  juegos: { titulo: string; precio: number; descripcion: string; imagen: string }[] = [];
  searchTerm: string = '';

  favoritos: { titulo: string; precio: number; imagen: string }[] = [];
  

  constructor(private menu: MenuController, private navController: NavController) {}
  
  goBack() {
    this.navController.pop();
  }
  
  ngOnInit() {
    this.menu.close("mainMenu");
    
    this.juegos = [
      ...DeportesPage.juegos,
      ...AventurasPage.juegos,
      ...TerrorPage.juegos,
      
      
    ];

    this.actualizarFavoritos();

    const storedFavorites = localStorage.getItem('favoritos');
    if (storedFavorites) {
      this.favoritos = JSON.parse(storedFavorites);
    }
  }

  actualizarFavoritos() {
    const storedFavorites = localStorage.getItem('favoritos');
    if (storedFavorites) {
        this.favoritos = JSON.parse(storedFavorites);
    } else {
        this.favoritos = []; 
    }
  }

  
  abrirMenu() {
    this.menu.open('mainMenu');
  }

  agregarAlCarrito(juego: any) {
    if (this.carritoComponent) {
      this.carritoComponent.addToCart(juego);
      console.log(`Juego añadido al carrito: ${juego.titulo}`);
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
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    } else {
      console.log(`El juego ya está en favoritos: ${juego.titulo}`);
    }
  }

  filterJuegos() {
    // Filtra los juegos según el término de búsqueda
    return this.juegos.filter(juego =>
      juego.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      juego.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  }
