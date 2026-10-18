import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AiChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AiResponse {
  answer: string;
}

export interface GenerateQuizRequest {
  topicName: string;
  questionCount: number;
  difficulty: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5175/api/Ai';

  ask(messages: AiChatMessage[]): Observable<AiResponse> {
    return this.http.post<AiResponse>(
      `${this.apiUrl}/ask`,
      {
        messages
      }
    );
  }

generateQuiz(
  topicName: string,
  questionCount: number,
  difficulty: string
): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/generate-quiz`,
    {
      topicName,
      questionCount,
      difficulty
    }
  );
}
}