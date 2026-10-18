import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';
import { Router } from '@angular/router';
import {
  SupervisorService,
  SupervisorDashboard
} from '../../core/services/supervisor.service';

@Component({
  selector: 'app-supervisor',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './supervisor.html',
  styleUrl: './supervisor.scss'
})
export class Supervisor implements OnInit {

  private supervisorService = inject(SupervisorService);
  private cdr = inject(ChangeDetectorRef);
private router = inject(Router);
  students = 0;
  topics = 0;
  questions = 0;
  activeAssignments = 0;
isDarkMode = false;
  topStudents: any[] = [];

  loading = true;

  // Şimdilik HTML'de kullanılıyor.
  // Daha sonra gerçek verilerle dolduracağız.
  studentsNeedHelp: any[] = [];

  recentActivities: any[] = [];

  ngOnInit(): void {

    console.log('🔥 SUPERVISOR SAYFASI AÇILDI');

  this.loadDarkMode();
    this.loadDashboard();
  }

  toggleDarkMode(): void {
  this.isDarkMode = !this.isDarkMode;

  document.body.classList.toggle(
    'dark-mode',
    this.isDarkMode
  );

  localStorage.setItem(
    'internai-theme',
    this.isDarkMode ? 'dark' : 'light'
  );
}

loadDarkMode(): void {
  this.isDarkMode =
    localStorage.getItem('internai-theme') === 'dark';

  document.body.classList.toggle(
    'dark-mode',
    this.isDarkMode
  );
}
  loadDashboard(): void {

    console.log('🔥 DASHBOARD VERİLERİ YÜKLENİYOR');

    this.loading = true;

    this.supervisorService.getDashboard().subscribe({

      next: (data: SupervisorDashboard) => {

        console.log('🔥 DASHBOARD DATA:', data);

        // API'den gelen gerçek veriler
        this.students = data.studentCount;
        this.topics = data.topicCount;
        this.questions = data.questionCount;
        this.activeAssignments = data.activeAssignmentCount;

        // Top 5 öğrenciler
        this.topStudents = data.topStudents.map(student => ({
          name: student.name,
          score: student.score,
          initials: this.getInitials(student.name)
        }));

        // Desteğe ihtiyaç duyan öğrenciler
this.studentsNeedHelp = data.studentsNeedHelp.map(student => ({
  name: student.name,
  score: student.score,
  initials: this.getInitials(student.name)
}));

// Son aktiviteler
this.recentActivities = data.recentActivities;
        // Veriler geldi
        this.loading = false;

        console.log('👨‍🎓 Öğrenci:', this.students);
        console.log('📚 Konu:', this.topics);
        console.log('❓ Soru:', this.questions);
        console.log('📝 Aktif Ödev:', this.activeAssignments);

        // Angular'ın ekranı hemen güncellemesini sağla
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          '❌ Supervisor dashboard verileri alınamadı:',
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

logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  this.router.navigate(['/login']);
}
}