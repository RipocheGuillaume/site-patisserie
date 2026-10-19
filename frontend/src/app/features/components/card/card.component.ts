import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductModel } from '../../../core/interfaces/products.model';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() categoryId = '';
  @Input() title = '';
  @Input() image = '';
  @Input() description = '';
  @Input() type? = '';

  selectedProduct = signal<Pick<
    ProductModel,
    'name' | 'image' | 'description'
  > | null>(null);

  openModal(product: Pick<ProductModel, 'name' | 'image' | 'description'>) {
    this.selectedProduct.set(product);
  }

  closeModal() {
    this.selectedProduct.set(null);
  }
}
