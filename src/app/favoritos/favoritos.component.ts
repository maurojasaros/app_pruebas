import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, createAnimation } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { LogoComponentComponent } from '../logo-component/logo-component.component';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, LogoComponentComponent]
})
export class FavoritosComponent implements OnInit {
  @Input() favoritos: { titulo: string; precio: number; imagen: string }[] = [];

  constructor(private el: ElementRef, private menu: MenuController, private navController: NavController) {}

  ngOnInit() {
    this.menu.close("mainMenu");
    const favoritosGuardados = localStorage.getItem('favoritos');
    if (favoritosGuardados) {
      this.favoritos = JSON.parse(favoritosGuardados);
      this.playEnterAnimation();
    }
  }

  goBack() {
    this.navController.pop();
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }
  // Método para limpiar la lista de favoritos
  limpiarFavoritos() {
    this.playExitAnimation().then(() => {
      this.favoritos = [];
      localStorage.removeItem('favoritos'); // Limpiar localStorage al limpiar favoritos
    });
  }

  // Método de animación para mostrar los favoritos al cargar
  playEnterAnimation() {
    const animation = createAnimation()
      .addElement(this.el.nativeElement.querySelectorAll('ion-card'))
      .duration(500)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(20px)', 'translateY(0px)');

    animation.play();
  }

  // Método de animación para ocultar los favoritos al limpiar
  playExitAnimation() {
    const animation = createAnimation()
      .addElement(this.el.nativeElement.querySelectorAll('ion-card'))
      .duration(500)
      .fromTo('opacity', '1', '0')
      .fromTo('transform', 'translateY(0px)', 'translateY(-20px)');

    return animation.play();
  }
}
