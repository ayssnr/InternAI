import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  SupervisorService,
  StudentNeedingHelp
} from '../../../core/services/supervisor.service';

@Component({
  selector: 'app-students-needing-help',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students-needing-help.html',
  styleUrl: './students-needing-help.scss'
})
export class StudentsNeedingHelp implements OnInit {

  private supervisorService = inject(SupervisorService);
  private router = inject(Router);

  students: StudentNeedingHelp[] = [];

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.supervisorService
      .getStudentsNeedingHelp()
      .subscribe({
        next: (data) => {
          this.students = data;
        },
        error: (error) => {
          console.error(
            '❌ Desteğe ihtiyaç duyan öğrenciler alınamadı:',
            error
          );
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/supervisor']);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}