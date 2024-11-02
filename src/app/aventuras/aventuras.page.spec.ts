import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AventurasPage } from './aventuras.page';

describe('AventurasPage', () => {
  let component: AventurasPage;
  let fixture: ComponentFixture<AventurasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AventurasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
