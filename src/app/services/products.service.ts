import { afterNextRender, Injectable, signal } from '@angular/core';
import { ProductModel, Products } from '../models/modelHome';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly productsState = signal<ProductModel[]>(
    new Products().categories,
  );
  readonly products = this.productsState.asReadonly();

  constructor() {
    // Keep server rendering and hydration consistent before reading browser storage.
    afterNextRender(() => this.loadProducts());
  }

  private loadProducts(): void {
    try {
      const productsData = localStorage.getItem('products');
      if (productsData !== null) {
        const products: unknown = JSON.parse(productsData);
        if (this.isProductList(products)) {
          this.productsState.set(products);
          return;
        }
      }
    } catch {
      // Invalid or unavailable storage must not prevent displaying the catalogue.
    }

    try {
      localStorage.setItem('products', JSON.stringify(this.productsState()));
    } catch {
      // The default catalogue remains available when persistence is blocked.
    }
  }

  private isProductList(value: unknown): value is ProductModel[] {
    return (
      Array.isArray(value) &&
      value.every(
        (product) =>
          product !== null &&
          typeof product === 'object' &&
          typeof product.title === 'string' &&
          typeof product.image === 'string' &&
          typeof product.description === 'string' &&
          (product.type === 'patisseries' || product.type === 'chocolats'),
      )
    );
  }

  public getProductsByType(type: string): ProductModel[] {
    return this.productsState().filter((product) => product.type === type);
  }

  public selectOneTypeByproduct(): ProductModel[] | null {
    const products: ProductModel[] = [];
    for (const type of ['patisseries', 'chocolats', 'macarons']) {
      const product = this.getProductsByType(type)[0];
      if (product) products.push(product);
    }
    return products.length > 0 ? products : null;
  }
}
