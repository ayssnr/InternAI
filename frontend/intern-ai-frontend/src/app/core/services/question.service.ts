import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CreateQuestion
} from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5175/api';


  createQuestion(
    question: CreateQuestion
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/Supervisor/questions`,
      question
    );

  }

}

