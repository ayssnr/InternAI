import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  AiService,
  AiChatMessage
} from '../../../core/services/ai.service';
import { ViewEncapsulation } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ai-assistant.html',
  styleUrl: './ai-assistant.scss',
   encapsulation: ViewEncapsulation.None
})
export class AiAssistant {

  private aiService = inject(AiService);
  private auth = inject(Auth);
  private router = inject(Router);
private sanitizer = inject(DomSanitizer);
private platformId = inject(PLATFORM_ID);
  userName = '';
isDarkMode = false;
  message = '';

  isLoading = false;

  messages: ChatMessage[] = [];

ngOnInit(): void {
  this.userName =
    this.auth.getUserName() || 'Öğrenci';

  if (isPlatformBrowser(this.platformId)) {
    this.isDarkMode =
      localStorage.getItem('internai-theme') === 'dark';
  }
}

goToAiQuiz(): void {
  this.router.navigate(['/student/ai-quiz']);
}
  sendMessage(): void {

    const text = this.message.trim();

    if (!text || this.isLoading) {
      return;
    }

    // Kullanıcının mesajını ekle
    this.messages.push({
      role: 'user',
      text
    });

    this.message = '';

    this.isLoading = true;

    // Backend'in istediği format
    const apiMessages: AiChatMessage[] =
      this.messages.map(message => ({
        role:
          message.role === 'user'
            ? 'user'
            : 'assistant',

        content: message.text
      }));

    this.aiService
      .ask(apiMessages)
      .subscribe({

        next: response => {

          this.messages.push({
            role: 'ai',
            text: response.answer
          });

          this.isLoading = false;
        },

        error: error => {

          console.error(
            'AI hatası:',
            error
          );

          this.messages.push({
            role: 'ai',
            text:
              'Üzgünüm, şu anda AI servisine bağlanamadım. Lütfen tekrar deneyin.'
          });

          this.isLoading = false;
        }

      });
  }
  

  handleEnter(
    event: KeyboardEvent
  ): void {

    if (
      event.key === 'Enter' &&
      !event.shiftKey
    ) {

      event.preventDefault();

      this.sendMessage();
    }
  }

  useSuggestion(text: string): void {

    this.message = text;

    this.sendMessage();
  }

  clearChat(): void {

    this.messages = [];

    this.message = '';
  }

  goBack(): void {

    this.router.navigate([
      '/dashboard'
    ]);
  }
formatMessage(text: string): SafeHtml {

  // AI bazen ``` karakterlerini \`\`\` olarak gönderiyor.
  // Önce bu kaçış karakterlerini normale çeviriyoruz.
  let formatted = text.replace(/\\`/g, '`');

  const codeBlocks: string[] = [];

  // Kod bloklarını önce sakla
  formatted = formatted.replace(
    /```(\w+)?\s*([\s\S]*?)```/g,
    (_match, language, code) => {

      const index = codeBlocks.length;

      const lang = language || 'code';

      const escapedCode = code
        .trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      codeBlocks.push(`
        <div class="code-block">

          <div class="code-header">
            <span class="code-language">${lang}</span>
            <span class="code-label">CODE</span>
          </div>

          <pre><code>${escapedCode}</code></pre>

        </div>
      `);

      return `___CODE_BLOCK_${index}___`;
    }
  );

  // Normal metni güvenli hale getir
  formatted = formatted
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Kalın yazı
  formatted = formatted.replace(
    /\*\*(.*?)\*\*/g,
    '<strong>$1</strong>'
  );

  // Inline code
  formatted = formatted.replace(
    /`([^`]+)`/g,
    '<code class="inline-code">$1</code>'
  );

  // Normal satır sonları
  formatted = formatted.replace(
    /\n/g,
    '<br>'
  );

  // Kod bloklarını geri koy
  codeBlocks.forEach((block, index) => {

    formatted = formatted.replace(
      `___CODE_BLOCK_${index}___`,
      block
    );

  });

  return this.sanitizer.bypassSecurityTrustHtml(
    formatted
  );
}
}