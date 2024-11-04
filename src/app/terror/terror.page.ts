import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-terror',
  templateUrl: './terror.page.html',
  styleUrls: ['./terror.page.scss'],
})
export class TerrorPage implements OnInit {


  static juegos = [
    {titulo: 'Outlast', precio: 19990, descripcion: 'Outlast es un juego de terror en primera persona donde un periodista investiga un asilo psiquiátrico lleno de horrores.', imagen: 'assets/img/Outlast.jpg'},
    { titulo: 'Dead Space', precio: 79990, descripcion: 'Dead Space sigue a Isaac Clarke, un ingeniero que lucha contra criaturas monstruosas en una nave espacial infestada.', imagen: 'assets/img/Dead Space.jpg'}
    // otros juegos...
  ];

  // Array de juegos
  juegos: { titulo: string; precio: number; descripcion: string; imagen: string }[] = [
    { titulo: 'Outlast', precio: 19990, descripcion: 'Sumérgete en el aterrador mundo de Outlast, un juego de terror en primera persona donde encarnas a un periodista que se adentra en un asilo psiquiátrico en ruinas. A medida que exploras sus oscuras instalaciones, te enfrentarás a monstruos inimaginables y descubrirás secretos escalofriantes que acechan en las sombras. Sin armas para defenderte, deberás usar tu ingenio y habilidades de sigilo para sobrevivir a esta aterradora experiencia.', imagen: 'assets/img/Outlast.jpg'},
    { titulo: 'Dead Space', precio: 79990, descripcion: 'Dead Space te sumerge en una experiencia de terror y ciencia ficción mientras sigues a Isaac Clarke, un ingeniero atrapado en una nave espacial desolada y infestada de horripilantes criaturas llamadas "necromorfos". A medida que exploras los oscuros pasillos y resuelves complejos rompecabezas, deberás enfrentarte a tus peores miedos y desentrañar los secretos de la catástrofe que ha consumido la nave. Con un enfoque en la supervivencia y el horror psicológico, cada encuentro te mantendrá al borde de tu asiento.', imagen: 'assets/img/Dead Space.jpg'}
  ];

  

  constructor(private menu: MenuController,  private navController: NavController) { }

  goBack() {
    this.navController.pop();
  }
  ngOnInit() {
    
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }

  
}