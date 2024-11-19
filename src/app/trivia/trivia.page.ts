import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../services/trivia.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
})
export class HomePage implements OnInit {
  triviaQuestions: any[] = [];
  selectedAnswer: string[] = []; // Para almacenar las respuestas seleccionadas por el usuario
  toastMessage: string = '';

  constructor(private triviaService: TriviaService, private toastController: ToastController) {}

  ngOnInit() {
    this.triviaService.getTrivia().subscribe((data) => {
      this.triviaQuestions = data.results; // Guarda las preguntas de trivia en el array
      this.selectedAnswer = new Array(this.triviaQuestions.length).fill(''); // Inicializa las respuestas como vacías
    });
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
      this.showToast('¡Correcto!', 'success');
    } else {
      this.showToast('Respuesta incorrecta', 'danger');
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
}