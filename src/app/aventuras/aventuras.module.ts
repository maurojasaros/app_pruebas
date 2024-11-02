import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AventurasPageRoutingModule } from './aventuras-routing.module';

import { AventurasPage } from './aventuras.page';
import { LogoComponentComponent } from '../logo-component/logo-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AventurasPageRoutingModule,
    LogoComponentComponent,
  ],
  declarations: [AventurasPage]
})
export class AventurasPageModule {}
