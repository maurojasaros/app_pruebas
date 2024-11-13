import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaJuegosPageRoutingModule } from './lista-juegos-routing.module';

import { ListaJuegosPage } from './lista-juegos.page';

import { SearchAndFilterComponent } from '../search-and-filter/search-and-filter.component'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { GameCardComponent } from '../game-card/game-card.component';
import { LogoComponentComponent } from '../logo-component/logo-component.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaJuegosPageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,  
    MatListModule,
    GameCardComponent,
    LogoComponentComponent
  ],
  declarations: [ListaJuegosPage, SearchAndFilterComponent]
})
export class ListaJuegosPageModule {}
