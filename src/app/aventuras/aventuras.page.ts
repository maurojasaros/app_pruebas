import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-aventuras',
  templateUrl: './aventuras.page.html',
  styleUrls: ['./aventuras.page.scss'],
})
export class AventurasPage implements OnInit {

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }
}
