import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private auth = inject(Auth);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';

  submitting = false;
  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    this.errorMessage = '';

    if (!this.email.trim() || !this.password) {
      this.errorMessage = 'Lütfen tüm alanları doldur.';
      return;
    }

    this.submitting = true;

    this.auth.login({
      email: this.email.trim(),
      password: this.password
    }).subscribe({

      next: () => {
        this.submitting = false;

        console.log('Login başarılı!');
        console.log('Kullanıcı rolü:', this.auth.getRole());

        const role = this.auth.getRole();

        // Supervisor → Supervisor Paneli
        if (role === 'Supervisor') {
          this.router.navigate(['/supervisor']);
        }

        // Admin → Admin Paneli
        else if (role === 'Admin') {
          this.router.navigate(['/admin']);
        }

        // Student → Normal Dashboard
        else {
          this.router.navigate(['/dashboard']);
        }
      },

      error: (error) => {
        this.submitting = false;
        console.error(error);

        this.errorMessage =
          error.error?.message ||
          'Email veya şifre hatalı.';
      }

    });
  }
}