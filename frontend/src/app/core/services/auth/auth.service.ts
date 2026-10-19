import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { UserModel } from '../../interfaces/user.model';
import { environment } from '../../../../environments/environment';

interface LoginResponse { accessToken: string; user: UserModel; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storageKey = 'auth_token';
  private token: string | null = this.loadToken();
  private readonly userState = signal<UserModel | null>(null);
  readonly user = this.userState.asReadonly();
  readonly isAuthenticated = computed(() => this.user() !== null);

  private loadToken(): string | null {
    try { return sessionStorage.getItem(this.storageKey); } catch { return null; }
  }

  getToken(): string | null { return this.token; }

  login(email: string, password: string) {
    this.logout();
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, { email, password }).pipe(
      tap(({ accessToken, user }) => {
        this.token = accessToken;
        this.userState.set(user);
        try { sessionStorage.setItem(this.storageKey, accessToken); } catch { /* Session en mémoire. */ }
      }),
    );
  }

  restoreSession() {
    return this.http.get<UserModel>(`${environment.apiUrl}/auth/me`).pipe(
      tap((user) => this.userState.set(user)),
    );
  }

  logout(): void {
    this.token = null;
    this.userState.set(null);
    try { sessionStorage.removeItem(this.storageKey); } catch { /* Session en mémoire fermée. */ }
    try { localStorage.removeItem('auth_user'); } catch { /* Ancien stockage inaccessible. */ }
  }
}
