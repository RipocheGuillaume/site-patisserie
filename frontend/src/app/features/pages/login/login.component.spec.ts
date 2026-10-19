import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let http: HttpTestingController;
  let navigate: jasmine.Spy;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
      imports: [LoginComponent],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
    navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  });
  afterEach(() => { sessionStorage.removeItem('auth_token'); http.verify(); });
  it('waits for a successful API login before navigating to admin', () => {
    const component = fixture.componentInstance;
    component.email = 'admin@example.fr';
    component.password = 'secret-password';
    component.onSubmit();
    expect(component.pending()).toBeTrue();
    expect(navigate).not.toHaveBeenCalled();
    component.onSubmit();
    const request = http.expectOne('/api/auth/login');
    request.flush({ accessToken: 'token', user: { id: 1, email: component.email, name: 'Admin' } });
    expect(navigate).toHaveBeenCalledWith(['/admin']);
    expect(component.pending()).toBeFalse();
    expect(component.password).toBe('');
  });
  it('stays on login and shows an error for rejected credentials', () => {
    const component = fixture.componentInstance;
    component.onSubmit();
    http.expectOne('/api/auth/login').flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(navigate).not.toHaveBeenCalled();
    expect(component.error()).toContain('incorrect');
    expect(component.pending()).toBeFalse();
  });
});
