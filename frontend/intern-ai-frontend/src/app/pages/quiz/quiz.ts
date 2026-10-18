import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Quiz as QuizService } from '../../core/services/quiz';
import { StudentProgressService } from '../../core/services/student-progress.service';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss'
})
export class Quiz implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private quizService = inject(QuizService);
  private cdr = inject(ChangeDetectorRef);
  quizId = '';
  quizTitle = '';
private progressService = inject(StudentProgressService);
  questions: any[] = [];
private auth = inject(Auth);

  currentQuestionIndex = 0;

  selectedAnswer: number | null = null;
quizStartedAt = 0;
  score = 0;
quizFinished= false;
questionAnimation = true;
totalTime = 0;
remainingTime = 0;
timer: any;

ngOnInit(): void {

  this.quizId =
    this.route.snapshot.paramMap.get('id') || '';

  console.log('QUIZ ID:', this.quizId);

  if (this.quizId) {

    this.loadQuiz();

    this.loadQuestions();

  }
}
loadQuiz(): void {

  this.quizService.getQuiz(this.quizId).subscribe({

    next: (quiz) => {

      console.log('QUIZ BİLGİSİ:', quiz);

      this.quizTitle = quiz.title;

      console.log('QUIZ TITLE:', this.quizTitle);

      this.cdr.detectChanges();
    },

    error: (error) => {

      console.error(
        'Quiz bilgileri alınamadı:',
        error
      );

    }

  });

}
  get progress(): number {
  if (this.questions.length === 0) {
    return 0;
  }

  return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
}

get scorePercentage(): number {
  if (this.questions.length === 0) {
    return 0;
  }

  return (this.score / this.questions.length) * 100;
}
loadQuestions(): void {

  this.quizService.getQuiz(this.quizId).subscribe({

    next: (quiz) => {

      console.log('QUIZ BİLGİSİ:', quiz);

      this.totalTime = quiz.duration;
      this.remainingTime = quiz.duration;

      console.log('QUIZ SÜRESİ:', this.totalTime);

      this.quizService.getQuestions(this.quizId).subscribe({

        next: (data) => {

          console.log('QUIZ QUESTIONS:', data);

          this.questions = [...data];

          if (this.questions.length > 0) {
            this.quizStartedAt = Date.now();
            this.startTimer();
          }

          this.cdr.detectChanges();

        },

        error: (error) => {
          console.error('Sorular alınamadı:', error);
        }

      });

    },

    error: (error) => {
      console.error('Quiz bilgisi alınamadı:', error);
    }

  });

}
startTimer(): void {

  this.timer = setInterval(() => {

    if (this.remainingTime > 0) {

      this.remainingTime--;

      this.cdr.detectChanges();

    } else {

      this.finishQuiz();

    }

  }, 1000);

}

finishQuiz(): void {

  if (this.timer) {
    clearInterval(this.timer);
    this.timer = null;
  }

  // Quiz sonucu sadece bir kere kaydedilsin
  if (!this.quizFinished) {
    this.quizFinished = true;
    this.saveProgress();
  }

}

stopQuiz(): void {

  if (this.timer) {
    clearInterval(this.timer);
    this.timer = null;
  }

  this.router.navigate(['/dashboard']);
}
saveProgress(): void {

  const studentId = this.auth.getUserId();

  if (!studentId) {
    console.error('Student ID bulunamadı.');
    return;
  }

  if (this.questions.length === 0) {
    return;
  }

  const topicId = this.questions[0].topicId;
const elapsedSeconds = this.quizStartedAt
  ? Math.max(1, Math.round((Date.now() - this.quizStartedAt) / 1000))
  : 0;
  const progress = {
    studentId: studentId,

    quizId: this.quizId,

    quizTitle: this.quizTitle,

    topicId: topicId,

    score: this.score,

    totalQuestions: this.questions.length,
    elapsedSeconds
  };

  console.log('KAYDEDİLECEK PROGRESS:', progress);

  this.progressService.saveProgress(progress).subscribe({

    next: (response) => {
      console.log('QUIZ SONUCU KAYDEDİLDİ:', response);
    },

    error: (error) => {
      console.error('Quiz sonucu kaydedilemedi:', error);
    }

  });
}

  selectAnswer(answerIndex: number): void {

    if (this.selectedAnswer !== null) {
      return;
    }

    this.selectedAnswer = answerIndex;

    const currentQuestion = this.questions[this.currentQuestionIndex];

    if (answerIndex === currentQuestion.correctAnswer) {
      this.score++;
    }

  }
nextQuestion(): void {

  if (this.currentQuestionIndex < this.questions.length - 1) {

    // Animasyonu kapat
    this.questionAnimation = false;

    setTimeout(() => {

      this.currentQuestionIndex++;
      this.selectedAnswer = null;

      // Animasyonu tekrar aç
      this.questionAnimation = true;

      this.cdr.detectChanges();

    }, 50);

  } else {

    this.finishQuiz();

  }

}
restartQuiz(): void {

  if (this.timer) {
    clearInterval(this.timer);
    this.timer = null;
  }

  this.currentQuestionIndex = 0;
  this.selectedAnswer = null;
  this.score = 0;
  this.quizFinished = false;

  this.remainingTime = this.totalTime;
this.quizStartedAt = Date.now();
  this.startTimer();
}
goHome(): void {
  this.router.navigate(['/dashboard']);
}

}