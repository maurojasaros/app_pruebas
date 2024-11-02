import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaJuegosPage } from './lista-juegos.page';

describe('ListaJuegosPage', () => {
  let component: ListaJuegosPage;
  let fixture: ComponentFixture<ListaJuegosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaJuegosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
