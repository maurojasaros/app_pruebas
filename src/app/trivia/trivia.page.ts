import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../services/trivia.service';
import { ToastController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';  // Asegúrate de importar el servicio de autenticación

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
})
export class TriviaPage implements OnInit {
  triviaQuestions: any[] = [];
  selectedAnswer: string[] = []; // Respuestas seleccionadas por el usuario
  answeredQuestions: boolean[] = []; // Arreglo para verificar si una pregunta ya fue respondida
  correctAnswersCount: number = 0; // Contador de respuestas correctas

  constructor(
    private triviaService: TriviaService,
    private toastController: ToastController,
    private authService: AuthServiceService // Inyectamos el servicio de autenticación
  ) {}

  ngOnInit() {
    this.loadTrivia();
  }

  // Método para cargar preguntas desde la base de datos o la API
  loadTrivia() {
    this.authService.getActiveUserEmail().then(async (email) => {
      if (email) {
        // Si hay un usuario activo, intentamos cargar las preguntas y las respuestas desde la base de datos local
        const storedQuestions = await this.triviaService.getStoredTrivia();

        if (storedQuestions && storedQuestions.length > 0) {
          // Si encontramos preguntas almacenadas, las usamos
          this.triviaQuestions = storedQuestions;
          this.selectedAnswer = new Array(this.triviaQuestions.length).fill('');  // Inicializamos el array de respuestas seleccionadas
          this.answeredQuestions = new Array(this.triviaQuestions.length).fill(false);  // Inicializamos el array de preguntas respondidas

          // Cargar las respuestas previas del usuario desde la base de datos
          this.loadStoredAnswers(email);

        } else {
          // Si no encontramos preguntas almacenadas, las cargamos desde la API
          this.fetchTriviaFromApi();
        }
      } else {
        // Si no hay usuario activo, cargamos las preguntas desde la API
        this.fetchTriviaFromApi();
      }
    });
  }

  // Método para obtener las preguntas de trivia desde la API
  fetchTriviaFromApi() {
    this.triviaService.getTrivia().subscribe(
      (data) => {
        this.triviaQuestions = data.results;
        this.selectedAnswer = new Array(this.triviaQuestions.length).fill('');  // Inicializamos el array de respuestas seleccionadas
        this.answeredQuestions = new Array(this.triviaQuestions.length).fill(false);  // Inicializamos el array de preguntas respondidas
        
        // Guardamos las preguntas en la base de datos local después de obtenerlas
        this.authService.getActiveUserEmail().then((email) => {
          if (email) {
            this.triviaService.storeTrivia(email, this.triviaQuestions);
          }
        });
      },
      (error) => {
        // Si hay un error, mostramos un mensaje de error usando el ToastController
        this.triviaService.presentErrorToast('No se pudo cargar las preguntas de trivia. Intenta nuevamente.');
      }
    );
  }

  // Método para cargar las respuestas almacenadas en la base de datos
  async loadStoredAnswers(email: string) {
    try {
      // Recuperar respuestas previas del usuario
      const storedAnswers = await this.triviaService.getStoredUserAnswers(email);

      // Asignar las respuestas almacenadas a las respuestas seleccionadas
      storedAnswers.forEach(answer => {
        const questionIndex = this.triviaQuestions.findIndex(q => q.question === answer.question);
        if (questionIndex !== -1) {
          this.selectedAnswer[questionIndex] = answer.selected_answer;
          this.answeredQuestions[questionIndex] = true;  // Marca la pregunta como respondida
        }
      });
    } catch (error) {
      console.error('Error al cargar las respuestas almacenadas', error);
    }
  }

  // Método para obtener todas las opciones de respuesta, incluyendo la respuesta correcta y las incorrectas
  getOptions(question: any): string[] {
    return [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
  }

  // Método para verificar si la respuesta seleccionada es correcta
  checkAnswer(index: number) {
    const selected = this.selectedAnswer[index];
    const correct = this.triviaQuestions[index].correct_answer;

    if (selected === correct) {
      this.correctAnswersCount++; // Incrementa el contador de respuestas correctas
      this.showToast('¡Correcto!', 'success');
    } else {
      this.showToast('Respuesta incorrecta', 'danger');
    }

    // Marca la pregunta como respondida
    this.answeredQuestions[index] = true;

    // Guardar o actualizar la respuesta del usuario en la base de datos
    this.saveUserAnswer(index);
  }

    // Método para guardar o actualizar la respuesta del usuario
  async saveUserAnswer(index: number) {
    try {
      const email = await this.authService.getActiveUserEmail();
      if (email && this.selectedAnswer[index]) {
        const question = this.triviaQuestions[index].question;
        const selectedAnswer = this.selectedAnswer[index];

        // Cambiar de number (1 o 0) a boolean (true o false)
        const isCorrect = selectedAnswer === this.triviaQuestions[index].correct_answer;

        // Guardar o actualizar la respuesta del usuario en la base de datos
        await this.triviaService.storeUserAnswer(email, question, selectedAnswer, isCorrect);  // Usar isCorrect como booleano
      }
    } catch (error) {
      console.error('Error al guardar la respuesta del usuario:', error);
    }
  }

  // Método para mostrar un toast con el mensaje de éxito o error
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }

  // Método para verificar si una pregunta ya fue respondida
  isAnswered(index: number): boolean {
    return this.answeredQuestions[index];
  }

  // Método para verificar si ya todas las preguntas fueron respondidas
  isQuizCompleted(): boolean {
    return this.answeredQuestions.every(answered => answered);
  }

  // Método para mostrar el puntaje final
  getFinalScore(): string {
    return `Puntaje final: ${this.correctAnswersCount} de ${this.triviaQuestions.length}`;
  }
}