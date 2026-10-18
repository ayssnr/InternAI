import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Assignment,
  CreateAssignment
} from '../models/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5175/api';

  createAssignment(
    assignment: CreateAssignment
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/Supervisor/assignments`,
      assignment
    );
  }

  getAssignments(): Observable<Assignment[]> {

    return this.http.get<Assignment[]>(
      `${this.apiUrl}/Supervisor/assignments`
    );
  }

  deleteAssignment(id: string): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/Supervisor/assignments/${id}`
    );
  }
  getMyAssignments(): Observable<Assignment[]> {
  return this.http.get<Assignment[]>(
    `${this.apiUrl}/Student/assignments`
  );
}
completeAssignment(id: string): Observable<any> {
  return this.http.put(
    `${this.apiUrl}/Student/assignments/${id}/complete`,
    {}
  );
}
}