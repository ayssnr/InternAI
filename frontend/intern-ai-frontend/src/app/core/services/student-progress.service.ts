import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudentProgress {
  id?: string;

  studentId: string;

  quizId: string;
  quizTitle: string;

  topicId: string;

  score: number;
  totalQuestions: number;

  lastQuizDate?: string;
  elapsedSeconds?: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentProgressService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:5175/api/StudentProgress';

  saveProgress(
    progress: StudentProgress
  ): Observable<StudentProgress> {

    return this.http.post<StudentProgress>(
      this.apiUrl,
      progress
    );
  }

  getProgress(
    studentId: string
  ): Observable<StudentProgress[]> {

    return this.http.get<StudentProgress[]>(
      `${this.apiUrl}/${studentId}`
    );
  }
}