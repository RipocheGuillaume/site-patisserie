import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).getToken();
  const isApiRequest = request.url === environment.apiUrl || request.url.startsWith(environment.apiUrl + '/');
  return next(token && isApiRequest
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request);
};
