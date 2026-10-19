import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-admin',
  styleUrl: './admin.component.css',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
