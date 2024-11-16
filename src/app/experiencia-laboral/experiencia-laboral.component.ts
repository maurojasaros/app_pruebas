import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';  // Asegúrate de que este servicio esté correcto
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
})
export class ExperienciaLaboralComponent implements OnInit {
  experienciaLaboral: any[] = []; // Arreglo para almacenar las experiencias laborales
  nuevaExperiencia: any = {}; // Para almacenar los datos de una nueva experiencia laboral

  constructor(
    private authService: AuthServiceService,  // Servicio de autenticación y base de datos
    private router: Router  // Para navegación
  ) {}

  ngOnInit() {
    this.loadExperienciaLaboral(); // Cargar las experiencias laborales al iniciar
  }

  // Método para cargar las experiencias laborales del usuario activo
  async loadExperienciaLaboral() {
    try {
      const result = await this.authService.dbInstance.executeSql(
        `SELECT * FROM experiencia_laboral WHERE user_email = ?`,
        [await this.getActiveUserEmail()]
      );

      this.experienciaLaboral = [];
      for (let i = 0; i < result.rows.length; i++) {
        this.experienciaLaboral.push(result.rows.item(i));
      }
    } catch (error) {
      console.error('Error al cargar las experiencias laborales:', error);
    }
  }

  // Método para agregar una nueva experiencia laboral
  async addExperienciaLaboral() {
    try {
      const email = await this.getActiveUserEmail();  // Obtener el correo del usuario activo
      await this.authService.dbInstance.executeSql(
        `INSERT INTO experiencia_laboral (user_email, empresa, puesto, fecha_inicio, fecha_fin, descripcion)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          email,
          this.nuevaExperiencia.empresa,
          this.nuevaExperiencia.puesto,
          this.nuevaExperiencia.fecha_inicio,
          this.nuevaExperiencia.fecha_fin,
          this.nuevaExperiencia.descripcion
        ]
      );
      console.log('Experiencia laboral agregada');
      this.loadExperienciaLaboral(); // Recargar las experiencias laborales después de agregar
      this.nuevaExperiencia = {};  // Limpiar el formulario
    } catch (error) {
      console.error('Error al agregar experiencia laboral:', error);
    }
  }

  // Método para actualizar una experiencia laboral
  async updateExperienciaLaboral(experiencia: any) {
    try {
      const email = await this.getActiveUserEmail();  // Obtener el correo del usuario activo
      await this.authService.dbInstance.executeSql(
        `UPDATE experiencia_laboral SET empresa = ?, puesto = ?, fecha_inicio = ?, fecha_fin = ?, descripcion = ? 
         WHERE id = ? AND user_email = ?`,
        [
          experiencia.empresa,
          experiencia.puesto,
          experiencia.fecha_inicio,
          experiencia.fecha_fin,
          experiencia.descripcion,
          experiencia.id,
          email
        ]
      );
      console.log('Experiencia laboral actualizada');
      this.loadExperienciaLaboral(); // Recargar las experiencias laborales después de actualizar
    } catch (error) {
      console.error('Error al actualizar experiencia laboral:', error);
    }
  }

  // Método para eliminar una experiencia laboral
  async deleteExperienciaLaboral(experienciaId: number) {
    try {
      const email = await this.getActiveUserEmail();  // Obtener el correo del usuario activo
      await this.authService.dbInstance.executeSql(
        `DELETE FROM experiencia_laboral WHERE id = ? AND user_email = ?`,
        [experienciaId, email]
      );
      console.log('Experiencia laboral eliminada');
      this.loadExperienciaLaboral(); // Recargar las experiencias laborales después de eliminar
    } catch (error) {
      console.error('Error al eliminar experiencia laboral:', error);
    }
  }

  // Método auxiliar para obtener el correo del usuario activo
  async getActiveUserEmail(): Promise<string> {
    const result = await this.authService.dbInstance.executeSql(
      `SELECT email FROM sesion_data WHERE active = 1`,
      []
    );
    if (result.rows.length > 0) {
      return result.rows.item(0).email;
    }
    return '';  // Retorna vacío si no hay sesión activa
  }
}
