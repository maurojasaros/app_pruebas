import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { ActivatedRoute } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';
import { of } from 'rxjs'; // Importamos 'of' para simular observables

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  // Creamos mocks de los servicios
  const mockAuthService = {
    registerUser: jasmine.createSpy('registerUser').and.returnValue(Promise.resolve(true)) // Simulamos un registro exitoso
  };

  const mockAlertController = {
    create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present')
    }))
  };

  const mockMenuController = {
    close: jasmine.createSpy('close'),
    open: jasmine.createSpy('open')
  };

  const mockPlatform = {
    ready: jasmine.createSpy('ready').and.returnValue(Promise.resolve()) // Simulamos que la plataforma está lista
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPage ],
      providers: [
        { provide: AuthServiceService, useValue: mockAuthService },
        { provide: AlertController, useValue: mockAlertController },
        { provide: MenuController, useValue: mockMenuController },
        { provide: Platform, useValue: mockPlatform },
        { provide: ActivatedRoute, useValue: { queryParams: of({ email: 'test@example.com' }) } } // Simulamos queryParams con un email
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el componente y obtener el email de los parámetros de la URL', waitForAsync(() => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.email).toBe('test@example.com');
      expect(mockMenuController.close).toHaveBeenCalledWith('mainMenu');
      expect(mockPlatform.ready).toHaveBeenCalled();
    });
  }));

  it('debe abrir el menú cuando se llama a abrirMenu', () => {
    component.abrirMenu();
    expect(mockMenuController.open).toHaveBeenCalledWith('mainMenu');
  });

  it('debe llamar a registerUser y mostrar una alerta de éxito cuando el registro sea exitoso', waitForAsync(async () => {
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    mockAlertController.create.and.returnValue(Promise.resolve(alertSpy));

    // Simular respuesta exitosa del registro
    mockAuthService.registerUser.and.returnValue(Promise.resolve(true));

    // Rellenar campos con datos de prueba
    component.nombre = 'John';
    component.apellido = 'Doe';
    component.email = 'test@example.com';
    component.password = 'password123';
    component.nivelEducacion = 'Bachelor';
    component.direccion = '123 Main St';
    component.calle = 'Street';
    component.ciudad = 'City';

    // Llamar al método guardar y esperar la promesa
    await component.guardar();

    fixture.whenStable().then(() => {
      expect(mockAuthService.registerUser).toHaveBeenCalledWith(
        'John', 'Doe', 'test@example.com', 'password123', 'Bachelor', '123 Main St', 'Street', 'City'
      );
      expect(mockAlertController.create).toHaveBeenCalled();
      expect(alertSpy.present).toHaveBeenCalled();
    });
  }));

  it('debe mostrar una alerta si faltan campos obligatorios', waitForAsync(async () => {
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    mockAlertController.create.and.returnValue(Promise.resolve(alertSpy));

    // Configurar los campos con valores vacíos
    component.nombre = '';
    component.apellido = '';
    component.password = '';

    // Llamar al método guardar
    await component.guardar();

    fixture.whenStable().then(() => {
      expect(mockAlertController.create).toHaveBeenCalled();
      expect(alertSpy.present).toHaveBeenCalled();
    });
  }));

  it('debe mostrar una alerta si falta el campo nombre', waitForAsync(async () => {
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    mockAlertController.create.and.returnValue(Promise.resolve(alertSpy));

    // Configurar los campos con el campo 'nombre' vacío
    component.nombre = '';  // Falta el campo 'nombre'
    component.apellido = 'Doe';
    component.email = 'test@example.com';
    component.password = 'password123';
    component.nivelEducacion = 'Bachelor';
    component.direccion = '123 Main St';
    component.calle = 'Street';
    component.ciudad = 'City';

    // Llamar al método guardar
    await component.guardar();

    fixture.whenStable().then(() => {
      expect(mockAlertController.create).toHaveBeenCalled();
      expect(alertSpy.present).toHaveBeenCalled();
    });
  }));

  it('debe limpiar los campos cuando se llama a limpiarCampos', () => {
    component.limpiarCampos();
    expect(component.nombre).toBe('');
    expect(component.apellido).toBe('');
    expect(component.nivelEducacion).toBe('');
    expect(component.direccion).toBe('');
    expect(component.calle).toBe('');
    expect(component.ciudad).toBe('');
    expect(component.password).toBe('');
  });
});




