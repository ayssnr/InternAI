import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Quiz {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5175/api/Quiz';

  // Bütün quizleri getirir
  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Seçilen quizin bilgilerini getirir
  // Duration burada gelecek
  getQuiz(quizId: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${quizId}`
    );
  }

  // Seçilen quizin sorularını getirir
  getQuestions(quizId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/${quizId}/questions`
    );
  }
}