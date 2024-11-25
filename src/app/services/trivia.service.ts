import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { AuthServiceService } from './auth-service.service';  // Importar el servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private apiUrl = 'https://opentdb.com/api.php';

  constructor(
    private http: HttpClient, 
    private toastController: ToastController,
    private authService: AuthServiceService // Inyectar el servicio de autenticación
  ) {}

  // Función para decodificar las entidades HTML
  private decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  // Método para obtener preguntas de videojuegos desde la API
  getTrivia(): Observable<any> {
    return new Observable((observer) => {
      this.http.get<any>(`${this.apiUrl}?amount=5&category=15&type=multiple`).pipe(
        retry(3), // Reintenta 3 veces en caso de error
        catchError(error => {
          console.error('Error fetching trivia questions:', error);
          this.presentErrorToast('Error al obtener preguntas. Mostrando preguntas almacenadas...');
          
          // Si la API falla, buscamos las preguntas almacenadas en la base de datos
          this.getStoredTrivia().then((storedQuestions) => {
            observer.next(storedQuestions); // Retorna las preguntas almacenadas
            observer.complete();
          }).catch(err => {
            observer.error(err); // Si no hay preguntas almacenadas, muestra error
          });

          return of([]); // Devuelve un array vacío en caso de error
        })
      ).subscribe({
        next: async (data) => {
          const userEmail = await this.authService.getActiveUserEmail();
          if (userEmail && data.results.length > 0) {
            // Guardar las preguntas de trivia en la base de datos
            await this.storeTrivia(userEmail, data.results);
          }
          observer.next(data.results); // Retorna las preguntas obtenidas de la API
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  // Método para mostrar un Toast con el mensaje de error
  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  // Duración del Toast
      color: 'danger'  // Color del Toast
    });
    toast.present();
  }

  // Almacenar las preguntas de trivia en la base de datos
  async storeTrivia(userEmail: string, triviaQuestions: any[]) {
    try {
      if (!this.authService.dbInstance) {
        await this.authService.initializeDatabase();
      }
  
      
      for (const question of triviaQuestions) {
        if (question && question.question && question.correct_answer && Array.isArray(question.incorrect_answers)) {
          await this.authService.dbInstance.executeSql(
            `INSERT INTO trivia_questions (user_email, question, correct_answer, incorrect_answers)
             VALUES (?, ?, ?, ?)`,
            [userEmail, question.question, question.correct_answer, JSON.stringify(question.incorrect_answers)]
          );
        }
      }
      console.log('Preguntas de trivia almacenadas correctamente');
    } catch (error) {
      console.error('Error al almacenar las preguntas de trivia:', error);
    }
  }

  // Recuperar preguntas almacenadas en la base de datos
  async getStoredTrivia(): Promise<any[]> {
    try {
      const userEmail = await this.authService.getActiveUserEmail();
      if (!userEmail) {
        throw new Error('No se encontró un usuario activo');
      }
  
      if (!this.authService.dbInstance) {
        await this.authService.initializeDatabase(); // Inicializa la base de datos si no está lista
      }
  
      const result = await this.authService.dbInstance.executeSql(
        `SELECT * FROM trivia_questions WHERE user_email = ?`,
        [userEmail]
      );
  
      let storedQuestions: any[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        storedQuestions.push({
          question: row.question,
          correct_answer: row.correct_answer,
          incorrect_answers: JSON.parse(row.incorrect_answers)
        });
      }
  
      return storedQuestions;
    } catch (error) {
      console.error('Error al recuperar las preguntas almacenadas:', error);
      return []; // Si hay error, retorna un array vacío
    }
  }

  // Guardar la respuesta del usuario para una pregunta específica
  async storeUserAnswer(userEmail: string, question: string, selectedAnswer: string, isCorrect: boolean) {
    try {
      // Verifica si la base de datos está lista
      if (!this.authService.dbInstance) {
        await this.authService.initializeDatabase(); // Inicializa la base de datos si no está lista
      }

      // Verificar si ya existe una respuesta almacenada para la misma pregunta
      const result = await this.authService.dbInstance.executeSql(
        `SELECT * FROM trivia_answers WHERE user_email = ? AND question = ?`,
        [userEmail, question]
      );

      if (result.rows.length > 0) {
        // Si ya existe una respuesta, actualiza la respuesta
        await this.authService.dbInstance.executeSql(
          `UPDATE trivia_answers SET selected_answer = ?, is_correct = ? WHERE user_email = ? AND question = ?`,
          [selectedAnswer, isCorrect ? 1 : 0, userEmail, question]
        );
        console.log('Respuesta de trivia actualizada correctamente');
      } else {
        // Si no existe respuesta, insertamos una nueva
        await this.authService.dbInstance.executeSql(
          `INSERT INTO trivia_answers (user_email, question, selected_answer, is_correct)
           VALUES (?, ?, ?, ?)`,
          [userEmail, question, selectedAnswer, isCorrect ? 1 : 0]
        );
        console.log('Respuesta de trivia almacenada correctamente');
      }
    } catch (error) {
      console.error('Error al almacenar/actualizar la respuesta de trivia:', error);
    }
  }

  // Obtener las respuestas del usuario para todas las preguntas almacenadas
  async getStoredUserAnswers(userEmail: string): Promise<any[]> {
    try {
      // Verifica si la base de datos está lista
      if (!this.authService.dbInstance) {
        await this.authService.initializeDatabase(); // Inicializa la base de datos si no está lista
      }

      const result = await this.authService.dbInstance.executeSql(
        `SELECT * FROM trivia_answers WHERE user_email = ?`,
        [userEmail]
      );

      let storedAnswers: any[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        storedAnswers.push({
          question: row.question,
          selected_answer: row.selected_answer,
          is_correct: row.is_correct === 1 // Convertir 1/0 a true/false
        });
      }

      return storedAnswers;
    } catch (error) {
      console.error('Error al recuperar las respuestas almacenadas del usuario:', error);
      return []; // Si hay error, retorna un array vacío
    }
  }
}