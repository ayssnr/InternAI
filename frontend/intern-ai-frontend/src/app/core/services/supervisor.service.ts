
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TopStudent {
  studentId: string;
  name: string;
  score: number;
}

export interface StudentActivity {
  student: string;
  action: string;
  status: string;
  time: string;
}

export interface SupervisorDashboard {
  studentCount: number;
  topicCount: number;
  questionCount: number;
  activeAssignmentCount: number;

  topStudents: TopStudent[];

  studentsNeedHelp: TopStudent[];

  recentActivities: StudentActivity[];
}
export interface SupervisorDashboard {
  studentCount: number;
  topicCount: number;
  questionCount: number;
  activeAssignmentCount: number;
  topStudents: TopStudent[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface StudentWithProgress {
  id: string;
  name: string;
  email: string;
  quizCount: number;
  averageScore: number;
  lastQuizDate: string | null;
  lastQuizTitle: string;
}
export interface StudentNeedingHelp {
  id: string;
  name: string;
  email: string;
  averageScore: number;
  quizCount: number;
}
@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:5175/api/Supervisor';

  // =========================
  // DASHBOARD
  // =========================

  getDashboard(): Observable<SupervisorDashboard> {
    return this.http.get<SupervisorDashboard>(
      `${this.apiUrl}/dashboard`
    );
  }
  getStudentsNeedingHelp(): Observable<StudentNeedingHelp[]> {
  return this.http.get<StudentNeedingHelp[]>(
    `${this.apiUrl}/students-needing-help`
  );
}

  // =========================
  // ÖĞRENCİLER
  // =========================

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${this.apiUrl}/students`
    );
  }

  // =========================
  // ÖĞRENCİLER + İLERLEME
  // =========================

  getStudentsWithProgress(): Observable<StudentWithProgress[]> {
    return this.http.get<StudentWithProgress[]>(
      `${this.apiUrl}/students-with-progress`
    );
  }
}

