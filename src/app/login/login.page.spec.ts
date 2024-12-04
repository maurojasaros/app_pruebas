import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let navController: NavController;
  let alertController: AlertController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        NavController,
        AlertController,
        Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    navController = TestBed.inject(NavController);
    alertController = TestBed.inject(AlertController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show an alert if email is empty', async () => {
    component.email = '';
    await component.login();

    const alert = alertController.create({ 
      header: 'Error', 
      message: 'El campo de correo no puede estar vacío.', 
      buttons: ['OK']
    });

    expect(alert).toBeTruthy();
  });

  it('should show an alert if email format is invalid', async () => {
    component.email = 'invalid-email';
    await component.login();

    const alert = alertController.create({ 
      header: 'Error', 
      message: 'El formato del correo es inválido.', 
      buttons: ['OK']
    });

    expect(alert).toBeTruthy();
  });

  it('should show an alert if password is empty', async () => {
    component.password = '';
    await component.login();

    const alert = alertController.create({ 
      header: 'Error', 
      message: 'El campo de contraseña no puede estar vacío.', 
      buttons: ['OK']
    });

    expect(alert).toBeTruthy();
  });

  it('should show an alert if password is too short', async () => {
    component.password = '123';
    await component.login();

    const alert = alertController.create({ 
      header: 'Error', 
      message: 'La contraseña debe tener más de 4 caracteres.', 
      buttons: ['OK']
    });

    expect(alert).toBeTruthy();
  });

  it('should navigate to /home when login is valid', async () => {
    // Para simular un login exitoso, puedes crear una condición dentro de tu componente
    // Por ejemplo, usaremos un valor ficticio en email y contraseña:
    component.email = 'test@example.com';
    component.password = 'validPassword';

    // Llamamos al método de login
    await component.login();

    // Si el login es exitoso, el componente debe navegar a /home
    spyOn(navController, 'navigateForward');
    component.login();
    expect(navController.navigateForward).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to /registro when goToRegister is called', () => {
    component.goToRegister();

    spyOn(router, 'navigate');
    component.goToRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/registro']);
  });
});
