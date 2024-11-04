import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
 // Ajusta la ruta según tu estructura de archivos


@Component({
  selector: 'app-aventuras',
  templateUrl: './aventuras.page.html',
  styleUrls: ['./aventuras.page.scss'],
})
export class AventurasPage implements OnInit {
  

  static juegos = [
    { titulo: 'Zelda: Breath of the Wild', precio: 60000, descripcion: 'Aventura épica', imagen: 'assets/img/The Legend of Zelda.jpg' },
    {titulo: 'Mario Bros', precio: 29990, descripcion: 'Rescata a la princesa junto a tus compañeros Luigi y Yoshi, enfretate a los enemigos y supera todas las adversidades.', imagen: 'assets/img/Mario Bros.jpg'},
    // otros juegos...
  ];

  // Array de juegos
  juegos: { titulo: string; precio: number; descripcion: string; imagen: string }[] = [
    { titulo: 'Mario Bros', precio: 29990, descripcion: 'Embárcate en una emocionante aventura junto a la princesa, Luigi y Yoshi, mientras navegas por coloridos reinos llenos de desafíos. Enfréntate a enemigos icónicos y supera obstáculos ingeniosos en tu camino hacia la victoria. Utiliza habilidades únicas de tus compañeros para salvar a la princesa y restaurar la paz en el mundo.', imagen: 'assets/img/Mario Bros.jpg'},
    {titulo: 'The Legend of Zelda', precio: 59990, descripcion: 'Explora el vasto y mágico mundo de Hyrule mientras te enfrentas a desafiantes jefes y descubres secretos ocultos. Mejora tu equipo y habilidades para enfrentar los peligros que acechan en cada rincón del reino. Esta vez, la escalada te permitirá acceder a nuevos horizontes y explorar áreas inexploradas, ampliando tu aventura.', imagen: 'assets/img/The Legend of Zelda.jpg'}
  ];

  // Lista de juegos favoritos
  favoritos: { titulo: string; precio: number; imagen: string }[] = [];

  constructor(private menu: MenuController, private navController: NavController) { }

  goBack() {
    this.navController.pop();
  }
  ngOnInit() {
    
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }

  

  
}
