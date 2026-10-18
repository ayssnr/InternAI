
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Topic } from '../models/topic';

export interface CreateTopic {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5175/api';


  // ==========================
  // STUDENT
  // ==========================

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(
      `${this.apiUrl}/Topics`
    );
  }


  // ==========================
  // SUPERVISOR
  // ==========================

  createTopic(topic: CreateTopic): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/Supervisor/topics`,
      topic
    );
  }


  getSupervisorTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(
      `${this.apiUrl}/Supervisor/topics`
    );
  }


  updateTopic(
    id: string,
    topic: CreateTopic
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/Supervisor/topics/${id}`,
      topic
    );
  }


  deleteTopic(id: string): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/Supervisor/topics/${id}`
    );
  }

}

