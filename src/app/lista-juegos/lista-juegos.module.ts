import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaJuegosPageRoutingModule } from './lista-juegos-routing.module';

import { ListaJuegosPage } from './lista-juegos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaJuegosPageRoutingModule
  ],
  declarations: [ListaJuegosPage]
})
export class ListaJuegosPageModule {}
