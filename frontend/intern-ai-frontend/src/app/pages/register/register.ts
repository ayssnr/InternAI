
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private auth = inject(Auth);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  errorMessage = '';
  successMessage = '';

  submitting = false;
  showPassword = false;
  showConfirmPassword = false;


  register(): void {

    this.errorMessage = '';
    this.successMessage = '';

    // Boş alan kontrolü
    if (
      !this.name.trim() ||
      !this.email.trim() ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.errorMessage = 'Lütfen tüm alanları doldur.';
      return;
    }

    // Email kontrolü
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Geçerli bir e-posta adresi gir.';
      return;
    }

    // Şifre uzunluğu
    if (this.password.length < 6) {
      this.errorMessage = 'Şifre en az 6 karakter olmalı.';
      return;
    }

    // Şifre eşleşmesi
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Şifreler birbiriyle eşleşmiyor.';
      return;
    }

    this.submitting = true;

    const registerData = {
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password
    };

    console.log('REGISTER REQUEST:', registerData);

    this.auth.register(registerData).subscribe({

      next: (response) => {

        console.log('REGISTER SUCCESS:', response);

        this.submitting = false;

        this.successMessage =
          'Hesabın başarıyla oluşturuldu! Giriş sayfasına yönlendiriliyorsun...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1200);
      },

      error: (error) => {

        console.error('REGISTER ERROR:', error);

        this.submitting = false;

        if (error.status === 400) {

          this.errorMessage =
            error.error?.message ||
            'Bu e-posta adresi zaten kayıtlı.';

        } else if (error.status === 0) {

          this.errorMessage =
            'Backend sunucusuna bağlanılamadı. Backend çalışıyor mu?';

        } else {

          this.errorMessage =
            error.error?.message ||
            'Kayıt oluşturulamadı. Lütfen tekrar dene.';
        }
      }

    });
  }


  private isValidEmail(email: string): boolean {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  }


  togglePassword(): void {

    this.showPassword = !this.showPassword;

  }


  toggleConfirmPassword(): void {

    this.showConfirmPassword = !this.showConfirmPassword;

  }

}