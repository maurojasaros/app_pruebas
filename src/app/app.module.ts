import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';


import { LogoComponentComponent } from './logo-component/logo-component.component';
import { CarritoComponent } from './carrito/carrito.component';


import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';





@NgModule({
  declarations: [AppComponent ], 
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    LogoComponentComponent, 
    FormsModule,
    CarritoComponent,
    MatListModule,
    MatToolbarModule,
    
    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}