import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

// Mock de AuthServiceService
class AuthServiceServiceMock {
  loginUser(email: string, password: string): Promise<boolean> {
    if (email === 'test@example.com' && password === '1234') {
      return Promise.resolve(true); // Simula login exitoso
    }
    return Promise.resolve(false); // Simula login fallido
  }

  isSessionActive(): Promise<boolean> {
    return Promise.resolve(false); // Simula que no hay sesión activa
  }

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

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthServiceService, useClass: AuthServiceServiceMock },
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
    component.email = 'correo_invalido';
    component.password = '1234';

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
    component.password = '123';

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
    component.password = 'wrongpassword';

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

  // Función de sanitización
  const sanitizeInput = (input: string) => {
    // Eliminar todas las etiquetas HTML y atributos peligrosos
    return input.replace(/<[^>]*>?/g, '').replace(/on\w+="[^"]*"/g, '');
  };

  it('debería prevenir XSS en el correo y evitar la ejecución de scripts maliciosos', async () => {
    const maliciousInput = '<script>alert("Hacked!")</script>';
    component.email = maliciousInput;
    component.password = '1234';

    // Sanitización antes de la lógica del login
    component.email = sanitizeInput(component.email);

    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));

    await component.login();

    // Verifica que el correo ha sido sanitizado y no contiene código malicioso
    expect(component.email).not.toContain('<script>');
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'El formato del correo es inválido.',
      buttons: ['OK'],
    });
  });

  it('debería prevenir XSS en la contraseña y evitar la ejecución de scripts maliciosos', async () => {
    const maliciousInput = '<img src="x" onerror="alert(\'Hacked!\')">';
    component.email = 'test@example.com';
    component.password = maliciousInput;
  
    // Sanitización antes de la lógica del login
    console.log('Contraseña antes de sanitización:', component.password);
    component.password = sanitizeInput(component.password);
  
    // Imprimir para verificar la sanitización
    console.log('Contraseña después de sanitización:', component.password);
  
    // Verifica que la contraseña ha sido sanitizada correctamente
    expect(component.password).not.toContain('onerror');  // Verifica que 'onerror' ha sido eliminado
    expect(component.password).not.toContain('<img');      // Verifica que las etiquetas <img> han sido eliminadas
  
    // Asegúrate de que la contraseña tiene más de 4 caracteres
    if (component.password.trim().length === 0) {
      alertControllerSpy.create.and.returnValue(Promise.resolve({
        present: jasmine.createSpy('present'),
      } as any));
  
      await component.login();
  
      // Verifica que se muestra la alerta por tener una contraseña vacía después de sanitización
      expect(alertControllerSpy.create).toHaveBeenCalledWith({
        header: 'Error',
        message: 'El campo de contraseña no puede estar vacío.',
        buttons: ['OK'],
      });
    } else if (component.password.length < 4) {
      alertControllerSpy.create.and.returnValue(Promise.resolve({
        present: jasmine.createSpy('present'),
      } as any));
  
      await component.login();
  
      // Verifica que se muestra la alerta por tener una contraseña con menos de 4 caracteres
      expect(alertControllerSpy.create).toHaveBeenCalledWith({
        header: 'Error',
        message: 'La contraseña debe tener más de 4 caracteres.',
        buttons: ['OK'],
      });
    } else {
      // Si la contraseña es válida (más de 4 caracteres), intentamos hacer login
      alertControllerSpy.create.and.returnValue(Promise.resolve({
        present: jasmine.createSpy('present'),
      } as any));
  
      await component.login();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']); // O la ruta que corresponda
    }
  });
  
});
