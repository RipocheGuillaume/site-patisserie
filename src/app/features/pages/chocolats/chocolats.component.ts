import { Component, computed, inject } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-chocolats',
  imports: [CardComponent],
  templateUrl: './chocolats.component.html',
  styleUrl: './chocolats.component.css',
})
export class ChocolatsComponent {
  private readonly productsService = inject(ProductsService);
  readonly cards = computed(() =>
    this.productsService.getProductsByType('chocolats'),
  );
}
