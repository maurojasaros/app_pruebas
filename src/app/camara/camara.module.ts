import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamaraPageRoutingModule } from './camara-routing.module';

import { CamaraPage } from './camara.page';
import { LogoComponentComponent } from '../logo-component/logo-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamaraPageRoutingModule,
    LogoComponentComponent,
  ],
  declarations: [CamaraPage]
})
export class CamaraPageModule {}
