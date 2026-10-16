import { afterNextRender, Injectable } from '@angular/core';
import productsData from '../../../data/products.json';
import { ProductModel, productTypes } from '../../interfaces/products.model';
import { BaseService } from '../base.service';

@Injectable({ providedIn: 'root' })
export class ProductsService extends BaseService<ProductModel> {
  constructor() {
    super();
    if (!this.isProductList(productsData)) {
      throw new Error(
        'Le catalogue products.json contient des produits invalides.',
      );
    }
    this.setItems(productsData);
    afterNextRender(() => this.loadProducts());
  }

  getProductsByType(type: string): ProductModel[] {
    return this.items().filter((product) => product.type === type);
  }

  private loadProducts(): void {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts !== null) {
        const products: unknown = JSON.parse(storedProducts);
        if (this.isProductList(products)) {
          this.setItems(products);
          return;
        }
      }
    } catch {
      // Conserve le catalogue si le stockage est inaccessible ou invalide.
    }
    try {
      localStorage.setItem('products', JSON.stringify(this.items()));
    } catch {
      // Le catalogue reste disponible sans stockage local.
    }
  }

  private isProductList(value: unknown): value is ProductModel[] {
    return (
      Array.isArray(value) &&
      value.every(
        (product) =>
          product !== null &&
          typeof product === 'object' &&
          typeof product.id === 'string' &&
          typeof product.name === 'string' &&
          typeof product.image === 'string' &&
          typeof product.description === 'string' &&
          productTypes.some((type) => type === product.type),
      )
    );
  }
}
