import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private apiUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) {}

  // Método para obtener preguntas de videojuegos
  getTrivia(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?amount=5&category=15&type=multiple`);
  }
}
