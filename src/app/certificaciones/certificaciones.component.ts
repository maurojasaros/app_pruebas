import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss']
})
export class CertificacionesComponent implements OnInit {
  public certificados: any[] = []; // Para almacenar las certificaciones
  public fechaActual: string = new Date().toLocaleDateString();  // Definir la fecha actual aquí


  // Definir el objeto nuevoCertificado
  public nuevoCertificado = {
    nombre: '',
    descripcion: '',
    fecha: new Date().toLocaleDateString()
  };

  constructor(
    private authService: AuthServiceService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCertificados();
  }

  // Método para cargar las certificaciones desde la base de datos
  async loadCertificados() {
    try {
      const result = await this.authService.dbInstance.executeSql(
        `SELECT * FROM certificaciones WHERE user_email = ?`,
        [await this.getActiveUserEmail()]
      );

      this.certificados = [];
      for (let i = 0; i < result.rows.length; i++) {
        this.certificados.push(result.rows.item(i));
      }
    } catch (error) {
      console.error('Error al cargar las certificaciones:', error);
    }
  }

  // Método para obtener el correo electrónico del usuario activo desde la sesión
  private async getActiveUserEmail(): Promise<string> {
    const result = await this.authService.dbInstance.executeSql(
      `SELECT email FROM sesion_data WHERE active = 1`,
      []
    );
    if (result.rows.length > 0) {
      return result.rows.item(0).email;
    }
    return ''; 
  }

  // Método para agregar una nueva certificación
  async addCertificado(certificado: any) {
    try {
      const email = await this.getActiveUserEmail();
      if (email) {
        await this.authService.dbInstance.executeSql(
          `INSERT INTO certificaciones (user_email, nombre, descripcion, fecha) VALUES (?, ?, ?, ?)`,
          [email, certificado.nombre, certificado.descripcion, certificado.fecha]
        );
        this.loadCertificados();  // Recargar las certificaciones
      } else {
        console.error('No se ha encontrado un usuario activo');
      }
    } catch (error) {
      console.error('Error al agregar la certificación:', error);
    }
  }

  // Método para eliminar una certificación
  async deleteCertificado(id: number) {
    try {
      await this.authService.dbInstance.executeSql(
        `DELETE FROM certificaciones WHERE id = ?`,
        [id]
      );
      this.loadCertificados();  // Recargar las certificaciones
    } catch (error) {
      console.error('Error al eliminar la certificación:', error);
    }
  }
}