import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriviaPageRoutingModule } from './trivia-routing.module';

import { TriviaPage } from './trivia.page';
import { LogoComponentComponent } from '../logo-component/logo-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriviaPageRoutingModule,
    LogoComponentComponent
  ],
  declarations: [TriviaPage]
})
export class TriviaPageModule {}
