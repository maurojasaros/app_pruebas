import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerrorPageRoutingModule } from './terror-routing.module';

import { TerrorPage } from './terror.page';
import { LogoComponentComponent } from '../logo-component/logo-component.component';
import { GameCardComponent } from '../game-card/game-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerrorPageRoutingModule,
    LogoComponentComponent,
    GameCardComponent
  ],
  declarations: [TerrorPage]
})
export class TerrorPageModule {}
