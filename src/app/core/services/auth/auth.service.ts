import { Injectable, computed, signal } from '@angular/core';
import { UserModel } from '../../interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'auth_user';

  private readonly userState = signal<UserModel | null>(this.loadUser());

  readonly user = this.userState.asReadonly();

  readonly isAuthenticated = computed(() => this.user() !== null);

  private loadUser(): UserModel | null {
    try {
      const stored = localStorage.getItem(this.storageKey);

      if (!stored) return null;

      const user: unknown = JSON.parse(stored);

      if (
        typeof user === 'object' &&
        user !== null &&
        'id' in user &&
        typeof user.id === 'number' &&
        'email' in user &&
        typeof user.email === 'string' &&
        'name' in user &&
        typeof user.name === 'string'
      ) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }

      return null;
    } catch {
      return null;
    }
  }

  login(email: string, password: string): boolean {
    // Identifiants fictifs pour le développement
    if (email === 'admin@test.fr' && password === 'admin123') {
      const user: UserModel = {
        id: 1,
        email,
        name: 'Administrateur',
      };

      this.userState.set(user);

      try {
        localStorage.setItem(this.storageKey, JSON.stringify(user));
      } catch {
        // La session reste active en mémoire si le stockage est inaccessible.
      }

      return true;
    }

    return false;
  }

  logout(): void {
    this.userState.set(null);
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
      // La session en mémoire est déjà fermée.
    }
  }
}
