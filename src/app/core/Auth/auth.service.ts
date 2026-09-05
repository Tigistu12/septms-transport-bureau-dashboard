import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, CurrentUser, LoginRequest, RegisterRequest } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly accessTokenKey = 'septms_access_token';
  private readonly refreshTokenKey = 'septms_refresh_token';

  readonly currentUser = signal<CurrentUser | null>(null);

  register(request: RegisterRequest) {
    return this.http.post(`${environment.api.identity}/api/Auth/register`, request);
  }

  login(request: LoginRequest) {
    return this.http
      .post<AuthResponse>(`${environment.api.identity}/api/Auth/login`, request)
      .pipe(
        tap(response => {
          sessionStorage.setItem(this.accessTokenKey, response.accessToken);
          sessionStorage.setItem(this.refreshTokenKey, response.refreshToken);
          this.currentUser.set({
            userId: response.userId,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            faydaId: response.faydaId,
            role: response.role
          });
        })
      );
  }

  logout() {
    sessionStorage.removeItem(this.accessTokenKey);
    sessionStorage.removeItem(this.refreshTokenKey);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem(this.accessTokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}