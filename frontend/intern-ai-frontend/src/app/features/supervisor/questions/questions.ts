
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';

import { TopicService } from '../../../core/services/topic.service';
import { QuestionService } from '../../../core/services/question.service';

import { Topic } from '../../../core/models/topic';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './questions.html',
  styleUrl: './questions.scss'
})
export class Questions implements OnInit {

  private topicService = inject(TopicService);
  private questionService = inject(QuestionService);
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

  selectedTopic: Topic | null = null;

  loading = false;

  successMessage = '';
  errorMessage = '';

  questionText = '';

  options: string[] = [
    '',
    '',
    '',
    ''
  ];

  correctAnswer = 0;


  ngOnInit(): void {
    this.loadTopics();
  }


  // =========================
  // KONULARI GETİR
  // =========================

  loadTopics(): void {

    this.loading = true;

    this.topicService.getSupervisorTopics().subscribe({

      next: (data) => {

        console.log('📚 SORU SAYFASI KONULAR:', data);

        this.topics = data;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          '❌ Konular alınamadı:',
          error
        );

        this.errorMessage =
          'Konular yüklenirken bir hata oluştu.';

        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }


  // =========================
  // KONU SEÇ
  // =========================

  selectTopic(topic: Topic): void {

    this.selectedTopic = topic;

    this.successMessage = '';
    this.errorMessage = '';

    this.resetQuestionForm();
  }


  // =========================
  // KONU DEĞİŞTİR
  // =========================

  changeTopic(): void {

    this.selectedTopic = null;

    this.resetQuestionForm();

    this.successMessage = '';
    this.errorMessage = '';
  }


  // =========================
  // SORU EKLE
  // =========================

  createQuestion(): void {

    this.successMessage = '';
    this.errorMessage = '';


    if (!this.selectedTopic) {

      this.errorMessage =
        'Önce bir konu seçmelisin.';

      return;
    }


    if (!this.questionText.trim()) {

      this.errorMessage =
        'Soru metni boş bırakılamaz.';

      return;
    }


    if (
      this.options.some(
        option => !option.trim()
      )
    ) {

      this.errorMessage =
        'Tüm seçenekleri doldurmalısın.';

      return;
    }


    this.loading = true;


    const question = {

      topicId: this.selectedTopic.id,

      text: this.questionText.trim(),

      options: this.options.map(
        option => option.trim()
      ),

      correctAnswer: this.correctAnswer

    };


    console.log(
      '📤 GÖNDERİLEN SORU:',
      question
    );


    this.questionService
      .createQuestion(question)
      .subscribe({

        next: (response) => {

          console.log(
            '✅ SORU EKLENDİ:',
            response
          );

          this.successMessage =
            'Soru başarıyla eklendi.';

          this.resetQuestionForm();

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            '❌ SORU EKLENEMEDİ:',
            error
          );

          this.errorMessage =
            error?.error?.message ||
            'Soru eklenirken bir hata oluştu.';

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }


  // =========================
  // FORMU TEMİZLE
  // =========================

  resetQuestionForm(): void {

    this.questionText = '';

    this.options = [
      '',
      '',
      '',
      ''
    ];

    this.correctAnswer = 0;
  }

}

