import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProductModel } from '../../interfaces/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/products';

  getAll() {
    return this.http.get<ProductModel[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}`);
  }

  getByType(type: string) {
    return this.http.get<ProductModel[]>(this.apiUrl, {
      params: { type },
    });
  }

  create(product: Omit<ProductModel, 'id'>) {
    return this.http.post<ProductModel>(this.apiUrl, product);
  }

  update(id: number, product: Partial<ProductModel>) {
    return this.http.patch<ProductModel>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete<ProductModel>(`${this.apiUrl}/${id}`);
  }
}

