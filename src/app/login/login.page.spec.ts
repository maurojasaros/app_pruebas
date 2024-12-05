import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

// Mock de AuthServiceService
class AuthServiceServiceMock {
  // Simula el método loginUser
  loginUser(email: string, password: string): Promise<boolean> {
    if (email === 'test@example.com' && password === '1234') {
      return Promise.resolve(true); // Simula login exitoso
    }
    return Promise.resolve(false); // Simula login fallido
  }

  // Simula el método isSessionActive
  isSessionActive(): Promise<boolean> {
    return Promise.resolve(false); // Simula que no hay sesión activa
  }

  // Simula el método setSessionActive
  setSessionActive(email: string, isActive: boolean): Promise<void> {
    return Promise.resolve(); // No hace nada, simula éxito
  }
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Configuración del TestBed
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthServiceService, useClass: AuthServiceServiceMock }, // Usamos el mock del servicio
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar una alerta si el correo está vacío', async () => {
    component.email = '';
    component.password = '1234';

    // Mock de la alerta
    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));

    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'El campo de correo no puede estar vacío.',
      buttons: ['OK'],
    });
  });

  it('debería mostrar una alerta si el correo tiene un formato inválido', async () => {
    component.email = 'correo_invalido';  // Correo con formato incorrecto
    component.password = '1234';

    // Mock de la alerta
    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));

    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'El formato del correo es inválido.',
      buttons: ['OK'],
    });
  });

  it('debería mostrar una alerta si la contraseña tiene menos de 4 caracteres', async () => {
    component.email = 'test@example.com';
    component.password = '123';  // Contraseña con menos de 4 caracteres

    // Mock de la alerta
    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));

    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'La contraseña debe tener más de 4 caracteres.',
      buttons: ['OK'],
    });
  });

  it('debería mostrar una alerta si el login es incorrecto', async () => {
    component.email = 'test@example.com';
    component.password = 'wrongpassword';  // Contraseña incorrecta

    // Mock de la alerta
    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));

    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Correo o contraseña incorrectos.',
      buttons: ['OK'],
    });
  });

  it('debería mostrar una alerta si el correo está vacío al intentar hacer login', async () => {
    component.email = '';
    component.password = '1234';

    // Mock de la alerta
    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));

    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'El campo de correo no puede estar vacío.',
      buttons: ['OK'],
    });
  });

  it('debería mostrar una alerta si el correo tiene un formato inválido al intentar hacer login', async () => {
    component.email = 'invalid-email';
    component.password = '1234';

    // Mock de la alerta
    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));

    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'El formato del correo es inválido.',
      buttons: ['OK'],
    });
  });

  

});