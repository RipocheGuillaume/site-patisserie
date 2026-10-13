import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProductModel } from '../models/modelHome';
import { ProductsService } from './products.service';

@Component({ template: '' })
class CatalogueHost {
  readonly service = inject(ProductsService);
}

describe('ProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CatalogueHost] });
  });

  async function renderCatalogue() {
    const fixture = TestBed.createComponent(CatalogueHost);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.componentInstance.service;
  }

  it('provides all default products before accessing browser storage', () => {
    const getItem = spyOn(Storage.prototype, 'getItem');
    const service = TestBed.inject(ProductsService);
    expect(service.getProductsByType('patisseries').length).toBe(6);
    expect(service.getProductsByType('chocolats').length).toBe(4);
    expect(getItem).not.toHaveBeenCalled();
  });

  it('loads valid saved products after rendering', async () => {
    const saved: ProductModel[] = [{ title: 'Test', image: '/test.png', description: 'Description', type: 'chocolats' }];
    spyOn(Storage.prototype, 'getItem').and.returnValue(JSON.stringify(saved));
    const setItem = spyOn(Storage.prototype, 'setItem');
    const service = await renderCatalogue();
    expect(service.products()).toEqual(saved);
    expect(setItem).not.toHaveBeenCalled();
  });

  for (const invalid of ['{', '{}', '[null]', '[{"type":"chocolats"}]']) {
    it(`falls back to defaults for invalid storage: ${invalid}`, async () => {
      spyOn(Storage.prototype, 'getItem').and.returnValue(invalid);
      const setItem = spyOn(Storage.prototype, 'setItem');
      const service = await renderCatalogue();
      expect(service.products().length).toBe(10);
      expect(setItem).toHaveBeenCalledWith('products', JSON.stringify(service.products()));
    });
  }

  it('keeps the catalogue available when storage is blocked', async () => {
    spyOn(Storage.prototype, 'getItem').and.throwError('Storage blocked');
    spyOn(Storage.prototype, 'setItem').and.throwError('Storage blocked');
    const service = await renderCatalogue();
    expect(service.products().length).toBe(10);
  });
});
