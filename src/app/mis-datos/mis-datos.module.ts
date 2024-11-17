import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MisDatosRoutingModule } from './mis-datos-routing.module';
import { MisDatosComponent } from './mis-datos.component';

@NgModule({
  declarations: [MisDatosComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisDatosRoutingModule
  ],
  exports: [MisDatosComponent]
})
export class MisDatosModule {}