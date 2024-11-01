import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';


@Component({
  selector: 'app-logo-component',
  templateUrl: './logo-component.component.html',
  styleUrls: ['./logo-component.component.scss'],
  standalone: true, // Esta propiedad asegura que no dependa de nada más
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agrega esta línea
})
export class LogoComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
