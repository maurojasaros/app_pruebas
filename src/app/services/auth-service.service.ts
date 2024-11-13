import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
  }
  
  async initializeDatabase() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'mydatabase.db',
        location: 'default',
      });
      await this.createTables();
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  async createTables() {
    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS sesion_data(
        id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Puedes agregar un ID para el registro
        nombre TEXT,
        apellido TEXT,
        email TEXT UNIQUE,
        password TEXT,
        nivel_educacion TEXT,
        direccion TEXT,
        calle TEXT,
        ciudad TEXT,
        fecha_nacimiento TEXT,
        active INTEGER DEFAULT 1  -- Añadir valor por defecto a "active" si se requiere
      )`,
      []
    );
  }

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
    try {
      await this.dbInstance.executeSql(
        `INSERT INTO sesion_data (nombre, apellido, email, password, nivel_educacion, direccion, calle, ciudad, fecha_nacimiento)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, email, password, nivelEducacion, direccion, calle, ciudad, fechaNacimiento]
      );
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }

  async loginUser(email: string, password: string): Promise<boolean> {
    try {
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM sesion_data WHERE email = ? AND password = ?`,
        [email, password]
      );
  
      if (result.rows.length > 0) {
        await this.updateSessionStatus(email, 1); // Cambia el estado de active a 1
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
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

  // Cerrar sesión (cambiar el estado a inactivo)
  async logoutUser(email: string): Promise<void> {
    try {
      await this.updateSessionStatus(email, 0); // Cambiar estado de sesión a inactivo
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}