
import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatsService } from '../../core/services/stats.service';
import { StudentStats } from '../../core/models/stats';

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unlocked: boolean;
  type: string;
}

@Component({
  selector: 'app-achievements',
  imports: [CommonModule, RouterLink],
  templateUrl: './achievements.html',
  styleUrl: './achievements.scss'
})
export class Achievements implements OnInit {
  private statsService = inject(StatsService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  stats: StudentStats | null = null;
  achievements: Achievement[] = [];
  unlockedCount = 0;
  totalCount = 0;
  completionPercentage = 0;
  activeFilter: 'all' | 'unlocked' | 'locked' = 'all';

  ngOnInit(): void {
    // Sadece tarayıcıda çalıştır (SSR sırasında 401 vermesini engeller)
    if (isPlatformBrowser(this.platformId)) {
      this.loadAchievements();
    }
  }

  get filteredAchievements(): Achievement[] {
    if (this.activeFilter === 'unlocked') return this.achievements.filter(achievement => achievement.unlocked);
    if (this.activeFilter === 'locked') return this.achievements.filter(achievement => !achievement.unlocked);
    return this.achievements;
  }

  setFilter(filter: 'all' | 'unlocked' | 'locked'): void {
    this.activeFilter = filter;
  }


  loadAchievements(): void {
    this.statsService.getStats().subscribe({
      next: (data) => {
        console.log('🔥 ACHIEVEMENT STATS:', data);
        this.stats = data;
        this.calculateAchievements();
      },
      error: (error) => {
        console.error('❌ Başarılar için istatistikler alınamadı:', error);
      }
    });
  }

  getProgress(achievement: Achievement): number {
    return Math.min(
      (achievement.current / achievement.target) * 100,
      100
    );
  }

  calculateAchievements(): void {
    if (!this.stats) {
      return;
    }

    const totalQuizzes = this.stats.totalQuizzes;
    const totalQuestions = this.stats.totalQuestions;

    const perfectQuizzes = this.stats.progress.filter(
      progress => progress.totalQuestions > 0 && progress.score === progress.totalQuestions
    ).length;

    const uniqueTopics = new Set(
      this.stats.progress.map(progress => progress.topicId)
    ).size;

   this.achievements = [

  // =========================
  // QUIZ BAŞARILARI
  // =========================

  {
    id: 'first-quiz',
    icon: '🔥',
    title: 'İlk Quiz',
    description: 'İlk quizini tamamla',
    target: 1,
    current: totalQuizzes,
    unlocked: totalQuizzes >= 1,
    type: 'quiz'
  },

  {
    id: 'five-quizzes',
    icon: '⚡',
    title: 'Quiz Başlangıcı',
    description: '5 quiz tamamla',
    target: 5,
    current: totalQuizzes,
    unlocked: totalQuizzes >= 5,
    type: 'quiz'
  },

  {
    id: 'quiz-master',
    icon: '⭐',
    title: 'Quiz Ustası',
    description: '10 quiz tamamla',
    target: 10,
    current: totalQuizzes,
    unlocked: totalQuizzes >= 10,
    type: 'quiz'
  },

  {
    id: 'twenty-quizzes',
    icon: '🥇',
    title: 'Quiz Şampiyonu',
    description: '20 quiz tamamla',
    target: 20,
    current: totalQuizzes,
    unlocked: totalQuizzes >= 20,
    type: 'quiz'
  },

  {
    id: 'quiz-legend',
    icon: '🏆',
    title: 'Quiz Efsanesi',
    description: '25 quiz tamamla',
    target: 25,
    current: totalQuizzes,
    unlocked: totalQuizzes >= 25,
    type: 'quiz'
  },

  {
    id: 'fifty-quizzes',
    icon: '👑',
    title: 'Quiz Kralı',
    description: '50 quiz tamamla',
    target: 50,
    current: totalQuizzes,
    unlocked: totalQuizzes >= 50,
    type: 'quiz'
  },


  // =========================
  // SORU BAŞARILARI
  // =========================

  {
    id: 'knowledge-hunter',
    icon: '🧠',
    title: 'Bilgi Avcısı',
    description: '50 soru cevapla',
    target: 50,
    current: totalQuestions,
    unlocked: totalQuestions >= 50,
    type: 'question'
  },

  {
    id: 'hundred-questions',
    icon: '💎',
    title: 'Bilgi Ustası',
    description: '100 soru cevapla',
    target: 100,
    current: totalQuestions,
    unlocked: totalQuestions >= 100,
    type: 'question'
  },

  {
    id: 'two-hundred-questions',
    icon: '📖',
    title: 'Bilgi Hazinesi',
    description: '200 soru cevapla',
    target: 200,
    current: totalQuestions,
    unlocked: totalQuestions >= 200,
    type: 'question'
  },

  {
    id: 'five-hundred-questions',
    icon: '🧙',
    title: 'Bilgelik Ustası',
    description: '500 soru cevapla',
    target: 500,
    current: totalQuestions,
    unlocked: totalQuestions >= 500,
    type: 'question'
  },


  // =========================
  // MÜKEMMEL SKOR
  // =========================

  {
    id: 'perfect-score',
    icon: '🎯',
    title: 'Keskin Nişancı',
    description: 'Bir quizde %100 başarı elde et',
    target: 1,
    current: perfectQuizzes,
    unlocked: perfectQuizzes >= 1,
    type: 'perfect'
  },

  {
    id: 'three-perfect',
    icon: '🚀',
    title: 'Mükemmeliyetçi',
    description: '3 quizde %100 başarı elde et',
    target: 3,
    current: perfectQuizzes,
    unlocked: perfectQuizzes >= 3,
    type: 'perfect'
  },

  {
    id: 'five-perfect',
    icon: '💯',
    title: 'Kusursuz',
    description: '5 quizde %100 başarı elde et',
    target: 5,
    current: perfectQuizzes,
    unlocked: perfectQuizzes >= 5,
    type: 'perfect'
  },

  {
    id: 'ten-perfect',
    icon: '👑',
    title: 'Mükemmel Performans',
    description: '10 quizde %100 başarı elde et',
    target: 10,
    current: perfectQuizzes,
    unlocked: perfectQuizzes >= 10,
    type: 'perfect'
  },


  // =========================
  // KONU BAŞARILARI
  // =========================

  {
    id: 'topic-explorer',
    icon: '📚',
    title: 'Konu Kaşifi',
    description: '5 farklı konuda quiz çöz',
    target: 5,
    current: uniqueTopics,
    unlocked: uniqueTopics >= 5,
    type: 'topic'
  },

  {
    id: 'topic-master',
    icon: '🌎',
    title: 'Konu Ustası',
    description: 'Tüm konularda quiz çöz',
    target: 5,
    current: uniqueTopics,
    unlocked: uniqueTopics >= 5,
    type: 'topic'
  }

];

    this.totalCount = this.achievements.length;
    this.unlockedCount = this.achievements.filter(achievement => achievement.unlocked).length;
    this.completionPercentage = this.totalCount > 0
      ? Math.round((this.unlockedCount / this.totalCount) * 100)
      : 0;

    // Arayüzün verilerle anında render edilmesini tetikle
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
}
