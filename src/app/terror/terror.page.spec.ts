import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerrorPage } from './terror.page';

describe('TerrorPage', () => {
  let component: TerrorPage;
  let fixture: ComponentFixture<TerrorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
