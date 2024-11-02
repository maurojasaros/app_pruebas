import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-terror',
  templateUrl: './terror.page.html',
  styleUrls: ['./terror.page.scss'],
})
export class TerrorPage implements OnInit {

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }
}
