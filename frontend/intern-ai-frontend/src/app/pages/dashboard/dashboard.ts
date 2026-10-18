
import { Component, inject, OnInit, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../core/services/auth';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { TopicService } from '../../core/services/topic.service';
import { Topic } from '../../core/models/topic';
import { Quiz } from '../../core/services/quiz';
import { StatsService } from '../../core/services/stats.service';
import { StudentStats } from '../../core/models/stats';
import {
  Chart,
  ChartConfiguration,
  registerables
} from 'chart.js';
import {
  ViewChild,
  ElementRef
} from '@angular/core';
import { AssignmentService } from '../../core/services/assignment.service';
import { Assignment } from '../../core/models/assignment';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
  
})
export class Dashboard implements OnInit {

  private http = inject(HttpClient);
  private topicService = inject(TopicService);
  private auth = inject(Auth);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private quizService = inject(Quiz);
private statsService = inject(StatsService);
private platformId = inject(PLATFORM_ID);
private assignmentService = inject(AssignmentService);

  role = '';

  message = '';

  topics: Topic[] = [];
selectedTopicFilter: 'all' | 'system' | 'ai' = 'all';
  userName = '';
  isDarkMode = false;

  dailyProgress = 0;
stats: StudentStats | null = null;
topicProgress: {
  name: string;
  percentage: number;
}[] = [];
achievements = {
  firstQuiz: false,
  quizMaster: false,
  knowledgeHunter: false,
  consistentStudent: false
};
quizHistory: {
  topicName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: Date;
}[] = [];

@ViewChild('activityChart')
activityChart!: ElementRef<HTMLCanvasElement>;
@ViewChild('successChart')
successChart!: ElementRef<HTMLCanvasElement>;

 ngOnInit(): void {

  if (isPlatformBrowser(this.platformId)) {
    this.isDarkMode = localStorage.getItem('internai-theme') === 'dark';
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  this.role = this.auth.getRole() ?? '';

  this.userName = this.auth.getUserName() ?? 'Öğrenci';

  console.log('DASHBOARD ROLE:', this.role);
  console.log('DASHBOARD USER:', this.userName);

  this.loadTopics();
  this.loadStats();
}

get filteredTopics(): Topic[] {

  if (this.selectedTopicFilter === 'system') {
    return this.topics.filter(
      topic => !topic.isAiGenerated
    );
  }

  if (this.selectedTopicFilter === 'ai') {
    return this.topics.filter(
      topic => topic.isAiGenerated
    );
  }

  return this.topics;
}
loadStats(): void {

  this.statsService.getStats().subscribe({

    next: (data) => {

      console.log('STATS:', data);

      this.stats = data;
      this.calculateTopicProgress();
      this.calculateQuizHistory();
      this.calculateAchievements();

      this.cdr.detectChanges();

setTimeout(() => {
  this.createActivityChart();
  this.createSuccessChart();

});

    },

    error: (error) => {

      console.error('İstatistikler alınamadı:', error);

    }

  });

}



createActivityChart(): void {

  if (!this.activityChart || !this.stats) {
    return;
  }

  const progress = this.stats.progress;

  const labels = progress.map(
    (_item: any, index: number) => `Quiz ${index + 1}`
  );

  const values = progress.map(
    (item: any) => item.score
  );

  new Chart(
    this.activityChart.nativeElement,
    {
      type: 'line',

      data: {
        labels: labels,

        datasets: [
          {
            label: 'Doğru Cevap',

            data: values,

            tension: 0.4,

            fill: true,

            borderWidth: 3
          }
        ]
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false
          }
        },

        scales: {
          y: {
            beginAtZero: true,

            ticks: {
              precision: 0
            }
          }
        }
      }
    }
  );
}


createSuccessChart(): void {

  if (!this.successChart || !this.stats) {
    return;
  }

  const correct = this.stats.totalCorrect;

  const wrong =
    this.stats.totalQuestions - this.stats.totalCorrect;

  new Chart(
    this.successChart.nativeElement,
    {
      type: 'doughnut',

      data: {

        labels: [
          'Doğru',
          'Yanlış'
        ],

      datasets: [
  {
    data: [
      correct,
      wrong
    ],

    backgroundColor: [
      '#95f6b9', // Doğru - Yeşil
      '#f86f6f'  // Yanlış - Kırmızı
    ],

    borderWidth: 0
  }
]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        cutout: '70%',

        plugins: {

          legend: {
            position: 'bottom'
          }

        }

      }

    }
  );

}


calculateTopicProgress(): void {

  if (!this.stats || this.topics.length === 0) {
    console.log('Topic progress hesaplanamadı:', {
      stats: this.stats,
      topics: this.topics
    });

    return;
  }

  this.topicProgress = this.topics.map(topic => {

    const progressList = this.stats!.progress.filter(
      progress => progress.topicId === topic.id
    );

    if (progressList.length === 0) {

      return {
        name: topic.name,
        percentage: 0
      };

    }

    const totalScore = progressList.reduce(
      (sum, progress) => sum + progress.score,
      0
    );

    const totalQuestions = progressList.reduce(
      (sum, progress) => sum + progress.totalQuestions,
      0
    );

    const percentage =
      totalQuestions > 0
        ? Math.round((totalScore / totalQuestions) * 100)
        : 0;

    return {
      name: topic.name,
      percentage
    };

  });

  console.log('TOPIC PROGRESS:', this.topicProgress);

}

calculateQuizHistory(): void {

  if (!this.stats || this.topics.length === 0) {
    return;
  }

  this.quizHistory = this.stats.progress
    .map(progress => {

      const topic = this.topics.find(
        topic => topic.id === progress.topicId
      );

      const percentage =
        progress.totalQuestions > 0
          ? Math.round(
              (progress.score / progress.totalQuestions) * 100
            )
          : 0;

      return {
        topicName: topic?.name ?? 'Bilinmeyen Konu',
        score: progress.score,
        totalQuestions: progress.totalQuestions,
        percentage,
        date: new Date(progress.lastQuizDate)
      };

    })
    .filter(quiz => quiz.date >= this.getThreeDayStart())
    .sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

  console.log('QUIZ HISTORY:', this.quizHistory);

}


toggleDarkMode(): void {

  this.isDarkMode = !this.isDarkMode;

  if (isPlatformBrowser(this.platformId)) {
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('internai-theme', this.isDarkMode ? 'dark' : 'light');
  }

}

calculateAchievements(): void {

  if (!this.stats) {
    return;
  }

  // 🔥 İlk Quiz
  this.achievements.firstQuiz =
    this.stats.totalQuizzes >= 1;


  // ⭐ Quiz Ustası
  this.achievements.quizMaster =
    this.stats.totalQuizzes >= 10;


  // 🧠 Bilgi Avcısı
  this.achievements.knowledgeHunter =
    this.stats.totalQuestions >= 50;


  // 🚀 Kararlı Öğrenci
  const uniqueDays = new Set(
    this.stats.progress.map(progress => {

      const date = new Date(progress.lastQuizDate);

      return date.toISOString().split('T')[0];

    })
  );

  this.achievements.consistentStudent =
    uniqueDays.size >= 7;


  console.log(
    'ACHIEVEMENTS:',
    this.achievements
  );

}

logout(): void {

  this.auth.logout();

  this.router.navigate(['/login']);

}


  loadTopics(): void {

    this.topicService.getTopics().subscribe({

      next: (data) => {

        console.log('TOPICS:', data);

        this.topics= data;
        this.calculateTopicProgress();
        this.calculateQuizHistory();

        
        this.dailyProgress = Math.min(
          this.topics.length * 10,
          100
        );

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error('Topics alınamadı:', error);

      }

    });

  }


  startQuiz(topicId: string): void {

    this.quizService.getQuizzes().subscribe({

      next: (quizzes) => {

        const quiz = quizzes.find(
          q => q.topicId === topicId
        );

        if (quiz) {

          console.log('SEÇİLEN QUIZ:', quiz);

          this.router.navigate([
            '/quiz',
            quiz.id
          ]);

        } else {

          console.error(
            'Bu konuya ait quiz bulunamadı.'
          );

        }

      },

      error: (error) => {

        console.error(
          'Quizler alınamadı:',
          error
        );

      }

    });

  }


  testStudentEndpoint(): void {

    this.http
      .get<any>(
        'http://localhost:5175/api/Test/student'
      )
      .subscribe({

        next: (response) => {

          console.log(response);

          this.message = response.message;

        },

        error: (error) => {

          console.error(error);

          this.message = 'Yetkisiz erişim!';

        }

      });

  }

  private getThreeDayStart(): Date {

  const start = new Date();

  start.setHours(0, 0, 0, 0);

  start.setDate(start.getDate() - 2);

  return start;

  }

}
