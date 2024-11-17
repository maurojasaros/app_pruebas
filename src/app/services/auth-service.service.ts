import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Router } from '@angular/router';  // Importar Router para redirigir
import { Platform } from '@ionic/angular'; // Importar Platform si decides usarlo

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public dbInstance!: SQLiteObject;  // Definir dbInstance que representa la base de datos SQLite

  constructor(
    private sqlite: SQLite,
    private router: Router,  // Inyectar Router
    private platform: Platform // Inyectar Platform
  ) {
    // Asegurarse de que la base de datos se inicialice en cuanto el servicio se crea
    this.initializeDatabase();
  }

  // Inicializa la base de datos SQLite
  async initializeDatabase() {
    try {
      await this.platform.ready(); // Asegurarse de que la plataforma esté lista
      this.dbInstance = await this.sqlite.create({
        name: 'mydatabase.db',
        location: 'default',
      });
      console.log('Base de datos inicializada correctamente');
      await this.createTables(); // Crear las tablas necesarias
      await this.checkActiveSessionOnStart(); // Verificar si hay una sesión activa al inicio
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  // Crear las tablas necesarias si no existen
  async createTables() {
    try {
      // Crear tabla de usuarios
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
          active INTEGER DEFAULT 0
        )`, []
      );

      // Crear tabla de certificaciones
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS certificaciones(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_email TEXT,
          nombre TEXT,
          descripcion TEXT,
          fecha TEXT,
          FOREIGN KEY(user_email) REFERENCES sesion_data(email)
        )`, []
      );

      // Crear tabla de experiencia laboral
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS experiencia_laboral (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_email TEXT,
          empresa TEXT,
          puesto TEXT,
          fecha_inicio TEXT,
          fecha_fin TEXT,
          descripcion TEXT,
          FOREIGN KEY(user_email) REFERENCES sesion_data(email)
        )`, []
      );

      console.log('Tablas creadas o verificadas');
    } catch (error) {
      console.error('Error al crear las tablas:', error);
    }
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
    ciudad: string
  ): Promise<boolean> {
    if (!nombre || !apellido || !email || !password || !nivelEducacion || !direccion || !calle || !ciudad) {
      console.error('Todos los campos son obligatorios');
      return false;
    }

    try {
      // Esperar que la base de datos esté lista antes de proceder
      if (!this.dbInstance) {
        await this.initializeDatabase(); // Inicializar la base de datos si aún no está lista
      }

      // Insertar el nuevo usuario en la base de datos
      await this.dbInstance.executeSql(
        `INSERT INTO sesion_data (nombre, apellido, email, password, nivel_educacion, direccion, calle, ciudad)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, email, password, nivelEducacion, direccion, calle, ciudad]
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
      // Asegurarse de que la base de datos esté lista
      if (!this.dbInstance) {
        await this.initializeDatabase(); // Inicializar la base de datos si aún no está lista
      }

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
      // Asegurarse de que la base de datos esté lista
      if (!this.dbInstance) {
        await this.initializeDatabase(); // Inicializar la base de datos si aún no está lista
      }

      const result = await this.dbInstance.executeSql(
        `SELECT * FROM sesion_data WHERE active = 1`, []
      );
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error al verificar sesión activa:', error);
      return false;
    }
  }

  // Obtener el email del usuario activo
async getActiveUserEmail(): Promise<string | null> {
  try {
    // Asegurarse de que la base de datos esté lista
    if (!this.dbInstance) {
      await this.initializeDatabase(); // Inicializar la base de datos si aún no está lista
    }

    // Realizar la consulta para obtener el email del usuario activo
    const result = await this.dbInstance.executeSql(
      `SELECT email FROM sesion_data WHERE active = 1`, []
    );

    // Comprobar si se encontró un usuario activo
    if (result.rows.length > 0) {
      return result.rows.item(0).email; // Devuelve el email del primer usuario activo encontrado
    }

    // Si no se encontró un usuario activo, devolver null
    return null;
  } catch (error) {
    console.error('Error al obtener el email del usuario activo:', error);
    return null;
  }
}

  // Verificar si hay una sesión activa al inicio de la app
  async checkActiveSessionOnStart(): Promise<void> {
    try {
      // Asegurarse de que la base de datos esté lista
      if (!this.dbInstance) {
        await this.initializeDatabase(); // Inicializar la base de datos si aún no está lista
      }

      const result = await this.dbInstance.executeSql(
        `SELECT * FROM sesion_data WHERE active = 1`, []
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
      // Asegurarse de que la base de datos esté lista
      if (!this.dbInstance) {
        await this.initializeDatabase(); // Inicializar la base de datos si aún no está lista
      }

      await this.dbInstance.executeSql(
        `UPDATE sesion_data SET active = ? WHERE email = ?`,
        [active, email]
      );
    } catch (error) {
      console.error('Error al actualizar el estado de la sesión:', error);
    }
  }

  // Cerrar sesión
  async logoutUser(): Promise<void> {
    try {
      // Asegurarse de que la base de datos esté lista
      if (!this.dbInstance) {
        await this.initializeDatabase(); // Inicializar la base de datos si aún no está lista
      }

      const result = await this.dbInstance.executeSql(
        `SELECT email FROM sesion_data WHERE active = 1`, []
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
  
  // Obtener los datos del usuario por email
  async getUserData(email: string): Promise<any> {
    try {
      // Asegurarse de que la base de datos esté lista
      if (!this.dbInstance) {
        await this.initializeDatabase(); // Inicializar la base de datos si aún no está lista
      }

      const result = await this.dbInstance.executeSql(
        `SELECT * FROM sesion_data WHERE email = ?`,
        [email]
      );
      if (result.rows.length > 0) {
        return result.rows.item(0); // Devuelve los datos del primer (y único) usuario encontrado
      } else {
        console.error('Usuario no encontrado');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      return null;
    }
  }

  // Actualizar los datos del usuario
  async updateUserData(
    email: string,
    nombre: string,
    apellido: string,
    direccion: string,
    calle: string,
    ciudad: string
  ): Promise<boolean> {
    if (!nombre || !apellido || !direccion || !calle || !ciudad) {
      console.error('Todos los campos son obligatorios');
      return false;
    }

    try {
      // Asegurarse de que la base de datos esté lista
      if (!this.dbInstance) {
        await this.initializeDatabase(); // Inicializar la base de datos si aún no está lista
      }

      // Actualizar los datos del usuario en la base de datos
      await this.dbInstance.executeSql(
        `UPDATE sesion_data
        SET nombre = ?, apellido = ?, direccion = ?, calle = ?, ciudad = ?
        WHERE email = ?`,
        [nombre, apellido, direccion, calle, ciudad, email]
      );
      return true;
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      return false;
    }
  }
}