import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-acerca-de-nosotros',
  templateUrl: './acerca-de-nosotros.page.html',
  styleUrls: ['./acerca-de-nosotros.page.scss'],
})
export class AcercaDeNosotrosPage implements OnInit {

  constructor(private menu: MenuController, private navController: NavController) { }

  ngOnInit() {
    this.menu.close("mainMenu");
  }

  goBack() {
    this.navController.pop();
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }

}
