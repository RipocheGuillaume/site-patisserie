import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { firstValueFrom, isObservable } from 'rxjs';
import { AuthService } from './auth.service';
import { authInterceptor } from './auth.interceptor';
import { authGuard } from '../../guards/auth.guard';

describe('API authentication', () => {
  let service: AuthService;
  let http: HttpTestingController;
  const user = { id: 1, email: 'admin@example.fr', name: 'Admin' };
  beforeEach(() => {
    sessionStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    TestBed.configureTestingModule({ providers: [
      provideRouter([]), provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting(),
    ] });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => { service.logout(); http.verify(); });
  function login() {
    service.login(user.email, 'secret-password').subscribe();
    const request = http.expectOne('/api/auth/login');
    expect(request.request.body).toEqual({ email: user.email, password: 'secret-password' });
    request.flush({ accessToken: 'signed-token', user });
  }
  it('logs in through the API and attaches the token to protected requests', () => {
    login();
    expect(service.user()).toEqual(user);
    service.restoreSession().subscribe();
    const request = http.expectOne('/api/auth/me');
    expect(request.request.headers.get('Authorization')).toBe('Bearer signed-token');
    request.flush(user);
  });
  it('does not authenticate a rejected login', () => {
    service.login(user.email, 'wrong').subscribe({ error: () => {} });
    http.expectOne('/api/auth/login').flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.getToken()).toBeNull();
  });
  it('ignores the former user object stored in localStorage', () => {
    localStorage.setItem('auth_user', JSON.stringify(user));
    const result = TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));
    expect(result instanceof UrlTree).toBeTrue();
    expect(service.isAuthenticated()).toBeFalse();
  });
  it('validates the token with the backend before entering admin', async () => {
    login();
    const result = TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));
    if (!isObservable(result)) throw new Error('Expected an API session check');
    const outcome = firstValueFrom(result);
    http.expectOne('/api/auth/me').flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(TestBed.inject(Router).serializeUrl(await outcome as UrlTree)).toBe('/login');
    expect(service.getToken()).toBeNull();
  });
});
