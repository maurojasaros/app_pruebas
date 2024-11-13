import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DeportesPageRoutingModule } from './deportes-routing.module';

import { DeportesPage } from './deportes.page';
import { LogoComponentComponent } from '../logo-component/logo-component.component';
import { GameCardComponent } from '../game-card/game-card.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeportesPageRoutingModule,
    LogoComponentComponent,
    GameCardComponent
  ],
  declarations: [DeportesPage] 
})
export class DeportesPageModule {}


