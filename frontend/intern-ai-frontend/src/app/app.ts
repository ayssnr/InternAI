import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private platformId = inject(PLATFORM_ID);
  protected readonly title = signal('intern-ai-frontend');

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle(
        'dark-mode',
        localStorage.getItem('internai-theme') === 'dark'
      );
    }
  }
}
