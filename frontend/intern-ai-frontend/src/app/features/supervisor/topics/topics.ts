
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  TopicService,
  CreateTopic
} from '../../../core/services/topic.service';

import { Topic } from '../../../core/models/topic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topics',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './topics.html',
  styleUrl: './topics.scss'
})
export class Topics implements OnInit {

  private topicService = inject(TopicService);
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

  // ==========================
  // DATA
  // ==========================

  topics: Topic[] = [];

  loading = false;

  successMessage = '';
  errorMessage = '';


  // ==========================
  // NEW TOPIC
  // ==========================

  showCreateForm = false;

  newTopic: CreateTopic = {
    name: '',
    description: ''
  };


  // ==========================
  // EDIT
  // ==========================

  editingId: string | null = null;

  editTopic: CreateTopic = {
    name: '',
    description: ''
  };


  // ==========================
  // DELETE
  // ==========================

  deletingId: string | null = null;


  // ==========================
  // INIT
  // ==========================

  ngOnInit(): void {
    this.loadTopics();
  }


  // ==========================
  // LOAD
  // ==========================

  loadTopics(): void {

    this.loading = true;

    this.topicService.getSupervisorTopics().subscribe({

      next: (data) => {

        console.log('📚 SUPERVISOR TOPICS:', data);

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


  // ==========================
  // CREATE
  // ==========================

  createTopic(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (!this.newTopic.name.trim()) {

      this.errorMessage =
        'Konu adı boş bırakılamaz.';

      return;
    }

    if (!this.newTopic.description.trim()) {

      this.errorMessage =
        'Konu açıklaması boş bırakılamaz.';

      return;
    }


    this.loading = true;


    this.topicService.createTopic({

      name: this.newTopic.name.trim(),

      description:
        this.newTopic.description.trim()

    }).subscribe({

      next: () => {

        this.successMessage =
          'Konu başarıyla eklendi.';

        this.newTopic = {
          name: '',
          description: ''
        };

        this.showCreateForm = false;

        this.loadTopics();
      },

      error: (error) => {

        console.error(
          '❌ Konu eklenemedi:',
          error
        );

        this.errorMessage =
          error?.error?.message ||
          'Konu eklenirken hata oluştu.';

        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }


  // ==========================
  // EDIT START
  // ==========================

  startEdit(topic: Topic): void {

    this.successMessage = '';
    this.errorMessage = '';

    this.deletingId = null;

    this.editingId = topic.id;

    this.editTopic = {

      name: topic.name,

      description: topic.description

    };
  }


  // ==========================
  // EDIT CANCEL
  // ==========================

  cancelEdit(): void {

    this.editingId = null;

    this.editTopic = {
      name: '',
      description: ''
    };
  }


  // ==========================
  // UPDATE
  // ==========================

  updateTopic(topicId: string): void {

    this.successMessage = '';
    this.errorMessage = '';


    if (!this.editTopic.name.trim()) {

      this.errorMessage =
        'Konu adı boş bırakılamaz.';

      return;
    }


    if (!this.editTopic.description.trim()) {

      this.errorMessage =
        'Konu açıklaması boş bırakılamaz.';

      return;
    }


    this.loading = true;


    this.topicService.updateTopic(

      topicId,

      {
        name: this.editTopic.name.trim(),

        description:
          this.editTopic.description.trim()
      }

    ).subscribe({

      next: () => {

        this.successMessage =
          'Konu başarıyla güncellendi.';

        this.editingId = null;

        this.loadTopics();
      },

      error: (error) => {

        console.error(
          '❌ Konu güncellenemedi:',
          error
        );

        this.errorMessage =
          error?.error?.message ||
          'Konu güncellenirken hata oluştu.';

        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }


  // ==========================
  // DELETE CONFIRM
  // ==========================

  confirmDelete(topicId: string): void {

    this.editingId = null;

    this.deletingId = topicId;
  }


  // ==========================
  // DELETE CANCEL
  // ==========================

  cancelDelete(): void {

    this.deletingId = null;
  }


  // ==========================
  // DELETE
  // ==========================

  deleteTopic(topicId: string): void {

    this.loading = true;


    this.topicService
      .deleteTopic(topicId)
      .subscribe({

        next: () => {

          this.successMessage =
            'Konu başarıyla silindi.';

          this.deletingId = null;

          this.loadTopics();
        },

        error: (error) => {

          console.error(
            '❌ Konu silinemedi:',
            error
          );

          this.errorMessage =
            error?.error?.message ||
            'Konu silinirken hata oluştu.';

          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }

}

