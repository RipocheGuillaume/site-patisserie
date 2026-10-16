import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import productsData from '../../../data/products.json';
import { ProductModel, productTypes } from '../../interfaces/products.model';
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
    expect<unknown>(service.items()).toEqual(productsData);
    expect(service.getProductsByType('macarons').length).toBe(1);
    expect(service.getProductsByType('gateaux').length).toBe(5);
    expect(getItem).not.toHaveBeenCalled();
  });

  for (const type of productTypes) {
    it('loads valid saved products of type ' + type, async () => {
      const saved: ProductModel[] = [
        {
          id: '100',
          name: 'Test',
          image: '/test.png',
          description: 'Description',
          type,
        },
      ];
      spyOn(Storage.prototype, 'getItem').and.returnValue(
        JSON.stringify(saved),
      );
      const setItem = spyOn(Storage.prototype, 'setItem');
      const service = await renderCatalogue();
      expect(service.items()).toEqual(saved);
      expect(setItem).not.toHaveBeenCalled();
    });
  }

  for (const invalid of ['{', '{}', '[null]', '[{"type":"chocolats"}]']) {
    it(`falls back to defaults for invalid storage: ${invalid}`, async () => {
      spyOn(Storage.prototype, 'getItem').and.returnValue(invalid);
      const setItem = spyOn(Storage.prototype, 'setItem');
      const service = await renderCatalogue();
      expect(service.items().length).toBe(productsData.length);
      expect(setItem).toHaveBeenCalledWith(
        'products',
        JSON.stringify(service.items()),
      );
    });
  }

  it('keeps the catalogue available when storage is blocked', async () => {
    spyOn(Storage.prototype, 'getItem').and.throwError('Storage blocked');
    spyOn(Storage.prototype, 'setItem').and.throwError('Storage blocked');
    const service = await renderCatalogue();
    expect(service.items().length).toBe(productsData.length);
  });
});
