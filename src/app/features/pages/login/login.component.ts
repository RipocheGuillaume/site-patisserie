import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  onSubmit(): void {
    const success = this.authService.login(this.email, this.password);

    if (success) {
      this.router.navigate(['/admin']);
    } else {
      this.error.set('Email ou mot de passe incorrect');
    }
  }
}
