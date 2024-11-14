import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Router } from '@angular/router';  // Importar Router para redirigir
import { Platform } from '@ionic/angular'; // Importar Platform si decides usarlo

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public dbInstance!: SQLiteObject;

  constructor(
    private sqlite: SQLite,
    private router: Router,  // Inyectar Router
    private platform: Platform // Inyectar Platform
  ) {
    this.initializeDatabase();
  }

  // Inicializa la base de datos SQLite
  async initializeDatabase() {
    try {
      await this.platform.ready();  // Asegúrate de que la plataforma está lista
      this.dbInstance = await this.sqlite.create({
        name: 'mydatabase.db',
        location: 'default',
      });
      await this.createTables();
      await this.checkActiveSessionOnStart(); // Verifica si hay una sesión activa al inicio
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  // Crea las tablas necesarias
  async createTables() {
    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS sesion_data(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        apellido TEXT,
        email TEXT UNIQUE,
        password TEXT,
        nivel_educacion TEXT,
        direccion TEXT,
        calle TEXT,
        ciudad TEXT,
        fecha_nacimiento TEXT,
        active INTEGER DEFAULT 0
      )`,
      []
    );
  }

  // Registrar un nuevo usuario
  async registerUser(
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    nivelEducacion: string,
    direccion: string,
    calle: string,
    ciudad: string,
    fechaNacimiento: string
  ): Promise<boolean> {
    if (!nombre || !apellido || !email || !password || !nivelEducacion || !direccion || !calle || !ciudad || !fechaNacimiento) {
      console.error('Todos los campos son obligatorios');
      return false;
    }

    try {
      await this.dbInstance.executeSql(
        `INSERT INTO sesion_data (nombre, apellido, email, password, nivel_educacion, direccion, calle, ciudad, fecha_nacimiento)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, email, password, nivelEducacion, direccion, calle, ciudad, fechaNacimiento]
      );

      // Al registrar el usuario, lo marcamos como sesión activa
      await this.setSessionActive(email, true);

      // Redirigir al home después del registro exitoso
      this.router.navigate(['/home']);
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }

  // Login de usuario
  async loginUser(email: string, password: string): Promise<boolean> {
    if (!email || !password) {
      console.error('Email y contraseña son obligatorios');
      return false;
    }

    try {
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM sesion_data WHERE email = ? AND password = ?`,
        [email, password]
      );

      if (result.rows.length > 0) {
        // Si la validación es exitosa, se marca la sesión como activa
        await this.setSessionActive(email, true);

        // Redirigir al home después de un login exitoso
        this.router.navigate(['/home']);
        return true;
      } else {
        console.error('Email o contraseña incorrectos');
        return false;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  }

  // Verificar si hay una sesión activa
  async isSessionActive(): Promise<boolean> {
    try {
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM sesion_data WHERE active = 1`,
        []
      );
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error al verificar sesión activa:', error);
      return false;
    }
  }

  // Establecer el estado de sesión activo
  async setSessionActive(email: string, isActive: boolean): Promise<void> {
    try {
      const activeStatus = isActive ? 1 : 0;
      await this.updateSessionStatus(email, activeStatus);
    } catch (error) {
      console.error('Error al establecer el estado de sesión activa:', error);
    }
  }

  // Actualizar el estado de la sesión
  async updateSessionStatus(email: string, active: number): Promise<void> {
    try {
      await this.dbInstance.executeSql(
        `UPDATE sesion_data SET active = ? WHERE email = ?`,
        [active, email]
      );
    } catch (error) {
      console.error('Error al actualizar el estado de la sesión:', error);
    }
  }

  // Verificar si hay una sesión activa al inicio de la app
  async checkActiveSessionOnStart(): Promise<void> {
    try {
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM sesion_data WHERE active = 1`,
        []
      );
      if (result.rows.length > 0) {
        // Redirigir al Home si hay sesión activa
        this.router.navigate(['/home']);
      } else {
        // Redirigir al login si no hay sesión activa
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error al verificar sesión activa al inicio de la app:', error);
    }
  }

  // Cerrar sesión
  async logoutUser(): Promise<void> {
    try {
      const result = await this.dbInstance.executeSql(
        `SELECT email FROM sesion_data WHERE active = 1`,
        []
      );
      if (result.rows.length > 0) {
        const email = result.rows.item(0).email;
        await this.setSessionActive(email, false);
      }
      // Redirigir a la pantalla de login después de cerrar sesión
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}