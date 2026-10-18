// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// import { AssignmentService } from '../../../core/services/assignment.service';
// import { Assignment } from '../../../core/models/assignment';

// @Component({
//   selector: 'app-student-assignments',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './assignments.html',
//   styleUrl: './assignments.scss'
// })
// export class StudentAssignments implements OnInit {

//   private assignmentService = inject(AssignmentService);
//   private router = inject(Router);

//   assignments: Assignment[] = [];

//   ngOnInit(): void {
//     this.loadAssignments();
//   }

//   loadAssignments(): void {
//     this.assignmentService.getMyAssignments().subscribe({
//       next: (data) => {
//         console.log('📋 ÖĞRENCİNİN ÖDEVLERİ:', data);
//         this.assignments = data;
//       },
//       error: (error) => {
//         console.error('❌ Ödevler alınamadı:', error);
//       }
//     });
//   }

//   goBack(): void {
//     this.router.navigate(['/dashboard']);
//   }
// }

import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AssignmentService } from '../../../core/services/assignment.service';
import { Assignment } from '../../../core/models/assignment';

@Component({
  selector: 'app-student-assignments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignments.html',
  styleUrl: './assignments.scss'
})
export class StudentAssignments implements OnInit, OnDestroy {
  private assignmentService = inject(AssignmentService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // 1. ChangeDetectorRef inject edildi

  assignments: Assignment[] = [];

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments(): void {
    this.assignmentService.getMyAssignments().subscribe({
      next: (data) => {
        this.assignments = [...data]; // Yeni referans vererek atama yap
        this.cdr.detectChanges();     // 2. DOM güncellemesini tetikle
      },
      error: (error) => {
        console.error('🔴 API HATASI:', error);
      }
    });
  }

  ngOnDestroy(): void {}

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
  completeAssignment(assignment: Assignment): void {

  if (assignment.isCompleted) {
    return;
  }

  this.assignmentService
    .completeAssignment(assignment.id)
    .subscribe({

      next: () => {

        assignment.isCompleted = true;

        console.log(
          '✅ ÖDEV TAMAMLANDI:',
          assignment.title
        );

      },

      error: (error) => {

        console.error(
          '❌ ÖDEV TAMAMLANAMADI:',
          error
        );

      }

    });
}
}