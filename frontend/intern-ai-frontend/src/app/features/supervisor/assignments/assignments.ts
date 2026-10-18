import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { TopicService } from '../../../core/services/topic.service';
import { AssignmentService } from '../../../core/services/assignment.service';
import {
  SupervisorService,
  Student
} from '../../../core/services/supervisor.service';
import { Topic } from '../../../core/models/topic';
import { Assignment } from '../../../core/models/assignment';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './assignments.html',
  styleUrl: './assignments.scss'
})
export class Assignments implements OnInit {

  private topicService = inject(TopicService);
  private assignmentService = inject(AssignmentService);
  private supervisorService = inject(SupervisorService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
goBack(): void {
  this.router.navigate(['/supervisor']);
}

logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  this.router.navigate(['/login']);
}
  topics: Topic[] = [];
  assignments: Assignment[] = [];

students: Student[] = [];
  selectedStudentId = '';
  selectedTopicId = '';

  title = '';
  description = '';
  dueDate = '';

  loading = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    this.loadTopics();
    this.loadStudents();
    this.loadAssignments();
  }

  loadTopics(): void {

    this.topicService
      .getSupervisorTopics()
      .subscribe({
        next: (data) => {

          this.topics = data;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            '❌ Konular alınamadı:',
            error
          );

          this.errorMessage =
            'Konular yüklenirken hata oluştu.';

          this.cdr.detectChanges();
        }
      });
  }

loadStudents(): void {

  this.supervisorService
    .getStudents()
    .subscribe({

      next: (data) => {

        console.log(
          '👨‍🎓 ÖDEV SAYFASI ÖĞRENCİLER:',
          data
        );

        this.students = data;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          '❌ Öğrenciler alınamadı:',
          error
        );

        this.errorMessage =
          'Öğrenciler yüklenirken hata oluştu.';

        this.cdr.detectChanges();
      }
    });
}
  loadAssignments(): void {

    this.assignmentService
      .getAssignments()
      .subscribe({
        next: (data) => {

          this.assignments = data;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            '❌ Ödevler alınamadı:',
            error
          );
        }
      });
  }

  createAssignment(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (!this.selectedStudentId) {

      this.errorMessage =
        'Önce bir öğrenci seçmelisin.';

      return;
    }

    if (!this.selectedTopicId) {

      this.errorMessage =
        'Önce bir konu seçmelisin.';

      return;
    }

    if (!this.title.trim()) {

      this.errorMessage =
        'Ödev başlığı boş olamaz.';

      return;
    }

    if (!this.dueDate) {

      this.errorMessage =
        'Son teslim tarihi seçmelisin.';

      return;
    }

    this.loading = true;

    const assignment = {
      studentId: this.selectedStudentId,
      topicId: this.selectedTopicId,
      title: this.title.trim(),
      description: this.description.trim(),
      dueDate: new Date(this.dueDate).toISOString()
    };

    this.assignmentService
      .createAssignment(assignment)
      .subscribe({

        next: (response) => {

          console.log(
            '✅ ÖDEV EKLENDİ:',
            response
          );

          this.successMessage =
            'Ödev başarıyla öğrenciye atandı.';

          this.resetForm();
          this.loadAssignments();

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            '❌ ÖDEV EKLENEMEDİ:',
            error
          );

          this.errorMessage =
            error?.error?.message ||
            'Ödev eklenirken bir hata oluştu.';

          this.loading = false;

          this.cdr.detectChanges();
        }
      });
  }

  deleteAssignment(id: string): void {

    const confirmed =
      confirm(
        'Bu ödevi silmek istediğine emin misin?'
      );

    if (!confirmed) {
      return;
    }

    this.assignmentService
      .deleteAssignment(id)
      .subscribe({

        next: () => {

          this.successMessage =
            'Ödev başarıyla silindi.';

          this.loadAssignments();
        },

        error: (error) => {

          console.error(
            '❌ Ödev silinemedi:',
            error
          );

          this.errorMessage =
            'Ödev silinirken hata oluştu.';
        }
      });
  }

  resetForm(): void {

    this.selectedStudentId = '';
    this.selectedTopicId = '';
    this.title = '';
    this.description = '';
    this.dueDate = '';
  }
}