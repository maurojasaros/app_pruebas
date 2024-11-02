import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.page.html',
  styleUrls: ['./deportes.page.scss'],
})
export class DeportesPage implements OnInit {

  constructor(
    private menu: MenuController
  ) { }

  
  ngOnInit() {
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }
}
