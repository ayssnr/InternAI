import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private apiUrl = 'http://localhost:5175/api/Auth';


  login(data: LoginRequest): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        data
      )
      .pipe(

        tap(response => {

          if (isPlatformBrowser(this.platformId)) {

            localStorage.setItem(
              'token',
              response.token
            );

          }

        })

      );

  }


  register(data: RegisterRequest): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      data
    );

  }


  logout(): void {

    if (isPlatformBrowser(this.platformId)) {

      localStorage.removeItem('token');

    }

  }


  getToken(): string | null {

    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem('token');

  }


  getRole(): string | null {

    const payload = this.getJwtPayload();

    if (!payload) {
      return null;
    }

    return (
      payload.role ??
      payload[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] ??
      null
    );

  }

  getUserId(): string | null {

  const payload = this.getJwtPayload();

  if (!payload) {
    return null;
  }

  return (
    payload[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ] ??
    payload.sub ??
    null
  );
}
getUserName(): string | null {

  const token = this.getToken();

  if (!token) {
    return null;
  }

  try {

    const payload = token.split('.')[1];

    const decodedPayload = JSON.parse(
      atob(payload)
    );

    return (
      decodedPayload[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ] ??
      decodedPayload.name ??
      null
    );

  } catch (error) {

    console.error('JWT çözümlenemedi:', error);

    return null;
  }
}


  private getJwtPayload(): any | null {

    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {

      const payload = token.split('.')[1];

      const decodedPayload = JSON.parse(
        atob(payload)
      );

      return decodedPayload;

    } catch (error) {

      console.error(
        'JWT çözümlenemedi:',
        error
      );

      return null;

    }

  }


  isLoggedIn(): boolean {

    return !!this.getToken();

  }

}
