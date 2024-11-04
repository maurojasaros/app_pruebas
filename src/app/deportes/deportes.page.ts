import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.page.html',
  styleUrls: ['./deportes.page.scss'],
  
})
export class DeportesPage implements OnInit {
  

  static juegos = [
    { titulo: 'FIFA 23', precio: 40000, descripcion: 'Fútbol realista', imagen: 'assets/img/Fifa 2023.jpg' },
    { titulo: 'UFC', precio: 39990, descripcion: 'Experimenta las artes marciales mixtas con UFC.', imagen: 'assets/img/ufc.jpg' }
    // otros juegos...
  ];

  juegos: { titulo: string; precio: number; descripcion: string; imagen: string }[] = [
    { titulo: 'FIFA 2023', precio: 29990, descripcion: 'Disfruta del fútbol con FIFA 2023. Experimenta la jugabilidad más realista con gráficos impresionantes y un nuevo motor de juego. Con múltiples modos, desde partidos rápidos hasta ligas completas, cada partido es una experiencia única.', imagen: 'assets/img/Fifa 2023.jpg' },
    { titulo: 'UFC', precio: 39990, descripcion: 'Experimenta las artes marciales mixtas con UFC. Compite como tus luchadores favoritos en una variedad de modos, incluyendo modo carrera y combate en línea. La acción es intensa, con gráficos realistas y una jugabilidad fluida que te sumerge en el octágono.', imagen: 'assets/img/ufc.jpg' }
  ];

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