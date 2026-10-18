import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AiService } from '../../../core/services/ai.service';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-ai-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ai-quiz.html',
  styleUrl: './ai-quiz.scss'
})
export class AiQuiz {

  private aiService = inject(AiService);
  private auth = inject(Auth);
  private router = inject(Router);

  userName = '';

  topicName = '';

  questionCount = 5;

  difficulty = 'Orta';

  isLoading = false;

  errorMessage = '';

  ngOnInit(): void {
    this.userName =
      this.auth.getUserName() || 'Öğrenci';
  }


  generateQuiz(): void {

    this.errorMessage = '';

    const topic = this.topicName.trim();

    if (!topic) {
      this.errorMessage =
        'Lütfen bir konu adı gir.';
      return;
    }

    if (
      this.questionCount < 3 ||
      this.questionCount > 10
    ) {
      this.errorMessage =
        'Soru sayısı 3 ile 10 arasında olmalıdır.';
      return;
    }

    this.isLoading = true;

    this.aiService
      .generateQuiz(
        topic,
        this.questionCount,
        this.difficulty
      )
      .subscribe({

        next: (response) => {

          console.log(
            '🎯 AI QUIZ OLUŞTURULDU:',
            response
          );

          this.isLoading = false;

          // Oluşturulan quiz'e git
          if (response.quizId) {

            this.router.navigate([
              '/quiz',
              response.quizId
            ]);

          } else if (
            response.quiz?.id
          ) {

            this.router.navigate([
              '/quiz',
              response.quiz.id
            ]);

          } else {

            this.errorMessage =
              'Quiz oluşturuldu ancak quiz ID alınamadı.';
          }
        },

        error: (error) => {

          console.error(
            '❌ AI QUIZ HATASI:',
            error
          );

          this.isLoading = false;

          this.errorMessage =
            error?.error?.message ||
            'AI quiz oluşturulurken bir hata oluştu.';

        }

      });
  }


  goBack(): void {

    this.router.navigate([
      '/ai-assistant'
    ]);

  }
}