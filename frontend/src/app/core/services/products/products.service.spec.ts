import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { ProductModel } from '../../interfaces/products.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let http: HttpTestingController;
  const product: ProductModel = { id: 1, name: 'Royal', image: 'royal.png', description: 'Chocolat', type: 'gateaux' };
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(ProductsService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('filters products through the API', () => {
    service.getByType('gateaux').subscribe((items) => expect(items).toEqual([product]));
    const request = http.expectOne('/api/products?type=gateaux');
    expect(request.request.method).toBe('GET');
    request.flush([product]);
  });
  it('uses numeric product IDs for updates', () => {
    service.update(1, { name: 'Royal chocolat' }).subscribe();
    const request = http.expectOne('/api/products/1');
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual({ name: 'Royal chocolat' });
    request.flush({ ...product, name: 'Royal chocolat' });
  });
});
