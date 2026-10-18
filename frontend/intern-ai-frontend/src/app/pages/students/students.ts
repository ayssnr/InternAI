
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  SupervisorService,
  StudentWithProgress
} from '../../core/services/supervisor.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.html',
  styleUrl: './students.scss'
})
export class Students implements OnInit {

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
  students: StudentWithProgress[] = [];

  loading = true;


  ngOnInit(): void {

    console.log(
      '🔥 STUDENTS COMPONENT OLUŞTU',
      Date.now()
    );

    this.loadStudents();

  }


  loadStudents(): void {

    console.log(
      '🔥 LOAD STUDENTS ÇALIŞTI',
      Date.now()
    );

    this.loading = true;

    this.supervisorService.getStudentsWithProgress().subscribe({

      next: (data) => {

        console.log('STUDENTS:', data);

        console.log(
          'STUDENT COUNT:',
          data.length
        );


        this.students = data;

        this.loading = false;


        

        // Angular'a view'u hemen güncellemesini söylüyoruz
        this.cdr.detectChanges();

      },


      error: (error) => {

        console.error(
          'Öğrenciler yüklenemedi:',
          error
        );

        this.loading = false;

        this.cdr.detectChanges();

      }

    });

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