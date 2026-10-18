import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentStats } from '../models/stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5175/api/Stats';

  getStats(): Observable<StudentStats> {
    return this.http.get<StudentStats>(this.apiUrl);
  }
}