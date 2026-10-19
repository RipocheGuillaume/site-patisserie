import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  email = '';
  password = '';
  error = signal('');
  pending = signal(false);

  onSubmit(): void {
    if (this.pending()) return;
    this.error.set('');
    this.pending.set(true);
    this.authService.login(this.email, this.password).pipe(
      finalize(() => this.pending.set(false)),
    ).subscribe({
      next: () => { this.password = ''; void this.router.navigate(['/admin']); },
      error: (error: HttpErrorResponse) => this.error.set(
        error.status === 401 ? 'Email ou mot de passe incorrect' : 'Connexion impossible. Réessayez plus tard.',
      ),
    });
  }
}
