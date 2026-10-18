import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StatsService } from '../../core/services/stats.service';
import { TopicService } from '../../core/services/topic.service';
import { StudentProgress, StudentStats } from '../../core/models/stats';

type TopicPerformance = { topicName: string; percentage: number };
type ActivityDay = { date: string; label: string; count: number };
type QuestionTime = { topicName: string; seconds: number };

@Component({ selector: 'app-statistics', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './statistics.html', styleUrl: './statistics.scss' })
export class Statistics implements OnInit {
  private readonly statsService = inject(StatsService);
  private readonly topicService = inject(TopicService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);
  stats: StudentStats | null = null;
  recentQuizzes: StudentProgress[] = [];
  loading = true;
  error = false;
  private topicNames = new Map<string, string>();
  scoreDistribution = { veryLow: 0, low: 0, medium: 0, good: 0, excellent: 0 };
  bestQuizzes: StudentProgress[] = [];
  performanceHistory: { label: string; percentage: number }[] = [];
  topicPerformance: TopicPerformance[] = [];
  activityHeatmap: ActivityDay[] = [];
  questionTimeData: QuestionTime[] = [];
  currentHeatmapMonth = '';

  ngOnInit(): void { if (isPlatformBrowser(this.platformId)) this.loadStatistics(); else this.loading = false; }
  loadStatistics(): void {
    this.loading = true; this.error = false;
    forkJoin({ stats: this.statsService.getStats(), topics: this.topicService.getTopics() }).subscribe({
      next: ({ stats, topics }) => {
        this.stats = stats;
        this.topicNames = new Map(topics.map(topic => [topic.id, topic.name]));
        this.recentQuizzes = this.sortByDate(stats.progress).slice(0, 5);
        this.calculateScoreDistribution(); this.calculateBestQuizzes(); this.calculatePerformanceHistory();
        this.calculateTopicPerformance(); this.calculateActivityHeatmap(); this.calculateQuestionTime();
        this.loading = false; this.cdr.detectChanges();
      },
      error: err => { console.error('İstatistikler alınamadı:', err); this.loading = false; this.error = true; this.cdr.detectChanges(); }
    });
  }
  private calculateScoreDistribution(): void {
    this.scoreDistribution = { veryLow: 0, low: 0, medium: 0, good: 0, excellent: 0 };
    this.stats?.progress.forEach(quiz => { const score = this.getScorePercentage(quiz);
      if (score <= 20) this.scoreDistribution.veryLow++; else if (score <= 40) this.scoreDistribution.low++;
      else if (score <= 60) this.scoreDistribution.medium++; else if (score <= 80) this.scoreDistribution.good++; else this.scoreDistribution.excellent++; });
  }
  private calculateBestQuizzes(): void { this.bestQuizzes = [...(this.stats?.progress ?? [])].sort((a, b) => this.getScorePercentage(b) - this.getScorePercentage(a)).slice(0, 5); }
  private calculatePerformanceHistory(): void {
    const latestTen = this.sortByDate(this.stats?.progress ?? []).slice(0, 10).reverse();
    this.performanceHistory = latestTen.map((quiz, index) => ({ label: `Quiz ${index + 1}`, percentage: this.getScorePercentage(quiz) }));
  }
  private calculateTopicPerformance(): void {
    const topics = new Map<string, { correct: number; total: number }>();
    this.stats?.progress.forEach(quiz => { const current = topics.get(quiz.topicId) ?? { correct: 0, total: 0 }; current.correct += quiz.score; current.total += quiz.totalQuestions; topics.set(quiz.topicId, current); });
    this.topicPerformance = Array.from(topics.entries()).map(([topicId, data]) => ({ topicName: this.getTopicName(topicId), percentage: data.total ? Math.round((data.correct / data.total) * 100) : 0 })).sort((a, b) => b.percentage - a.percentage);
  }
  private calculateActivityHeatmap(): void {
    const counts = new Map<string, number>();
    this.stats?.progress.forEach(quiz => { const key = this.toLocalDateKey(new Date(quiz.lastQuizDate)); counts.set(key, (counts.get(key) ?? 0) + 1); });
    const today = new Date(); today.setHours(0, 0, 0, 0);
    this.currentHeatmapMonth = new Intl.DateTimeFormat('tr-TR', { month: 'long' })
      .format(today)
      .replace(/^./, letter => letter.toLocaleUpperCase('tr-TR'));
    this.activityHeatmap = Array.from({ length: 30 }, (_, index) => { const day = new Date(today); day.setDate(today.getDate() - 29 + index); const date = this.toLocalDateKey(day); return { date, label: String(day.getDate()), count: counts.get(date) ?? 0 }; });
  }
  private calculateQuestionTime(): void {
    this.questionTimeData = this.sortByDate(this.stats?.progress ?? []).slice(0, 10).map(quiz => {
      const elapsedSeconds = quiz.elapsedSeconds;
      return elapsedSeconds && quiz.totalQuestions
        ? { topicName: this.getTopicName(quiz.topicId), seconds: Math.round(elapsedSeconds / quiz.totalQuestions) }
        : null;
    }).filter((item): item is QuestionTime => item !== null);
  }
  getScorePercentage(quiz: StudentProgress): number { return quiz.totalQuestions ? Math.round((quiz.score / quiz.totalQuestions) * 100) : 0; }
  getScoreClass(quiz: StudentProgress): string { const score = this.getScorePercentage(quiz); return score >= 80 ? 'excellent' : score >= 50 ? 'good' : 'low'; }
  getTopicName(topicId: string): string { return this.topicNames.get(topicId) ?? 'Bilinmeyen Konu'; }
  getPerformanceLine(): string { const last = this.performanceHistory.length - 1; return this.performanceHistory.map((item, index) => `${last > 0 ? (index / last) * 100 : 50},${100 - item.percentage}`).join(' '); }
  getHeatLevel(count: number): string { return count === 0 ? 'level-0' : count === 1 ? 'level-1' : count === 2 ? 'level-2' : count === 3 ? 'level-3' : 'level-4'; }
  private sortByDate(progress: StudentProgress[]): StudentProgress[] { return [...progress].sort((a, b) => new Date(b.lastQuizDate).getTime() - new Date(a.lastQuizDate).getTime()); }
  private toLocalDateKey(date: Date): string { const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000); return offsetDate.toISOString().slice(0, 10); }
}
