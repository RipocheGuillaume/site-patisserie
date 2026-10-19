import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { convertToParamMap, provideRouter, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;
  let http: HttpTestingController;
  const params = new BehaviorSubject(convertToParamMap({ type: 'chocolats' }));
  beforeEach(async () => {
    params.next(convertToParamMap({ type: 'chocolats' }));
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideRouter([]), provideHttpClient(), provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: { paramMap: params, snapshot: { paramMap: params.value } } },
      ],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
  });
  afterEach(() => { fixture.destroy(); http.verify(); });
  it('updates the displayed catalogue when the category changes', () => {
    http.expectOne('/api/products?type=chocolats').flush([
      { id: 1, name: 'Rocher', image: '', description: '', type: 'chocolats' },
    ]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Rocher');
    params.next(convertToParamMap({ type: 'gateaux' }));
    http.expectOne('/api/products?type=gateaux').flush([
      { id: 2, name: 'Fraisier', image: '', description: '', type: 'gateaux' },
    ]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Nos gâteaux');
    expect(fixture.nativeElement.textContent).toContain('Fraisier');
    expect(fixture.nativeElement.textContent).not.toContain('Rocher');
  });
  it('recovers after a failed category request', () => {
    http.expectOne('/api/products?type=chocolats').flush({}, { status: 503, statusText: 'Unavailable' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeTruthy();
    params.next(convertToParamMap({ type: 'gateaux' }));
    http.expectOne('/api/products?type=gateaux').flush([]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
  });
  it('cancels the previous request when changing category', () => {
    const previous = http.expectOne('/api/products?type=chocolats');
    params.next(convertToParamMap({ type: 'gateaux' }));
    expect(previous.cancelled).toBeTrue();
    http.expectOne('/api/products?type=gateaux').flush([]);
  });
});
