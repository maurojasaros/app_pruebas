import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerrorPageRoutingModule } from './terror-routing.module';

import { TerrorPage } from './terror.page';
import { LogoComponentComponent } from '../logo-component/logo-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerrorPageRoutingModule,
    LogoComponentComponent,
  ],
  declarations: [TerrorPage]
})
export class TerrorPageModule {}
