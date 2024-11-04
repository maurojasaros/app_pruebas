import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-logo-component',
  templateUrl: './logo-component.component.html',
  styleUrls: ['./logo-component.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Mantén esta línea
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }), // Comienza fuera de la pantalla
        animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })) // Desliza hacia arriba
      ]),
      transition(':leave', [
        animate('0.5s ease-in', style({ transform: 'translateY(100%)', opacity: 0 })) // Desliza hacia abajo al salir
      ])
    ])
  ]
})
export class LogoComponentComponent implements OnInit {
  constructor() { }

  ngOnInit() {}
}
