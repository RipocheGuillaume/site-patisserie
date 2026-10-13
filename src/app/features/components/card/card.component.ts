import { Component, Input, signal } from '@angular/core';
import { ProductModel } from '../../../models/modelHome';
import { RouterLink } from '@angular/router';

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

  selectedProduct = signal<ProductModel | null>(null);

  openModal(product: ProductModel) {
    this.selectedProduct.set(product);
  }

  closeModal() {
    this.selectedProduct.set(null);
  }
}
