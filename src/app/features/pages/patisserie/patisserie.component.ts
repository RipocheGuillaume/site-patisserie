import { Component, computed, inject } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-patisserie',
  imports: [CardComponent],
  templateUrl: './patisserie.component.html',
  styleUrl: './patisserie.component.css',
})
export class PatisserieComponent {
  private readonly productsService = inject(ProductsService);
  readonly cards = computed(() =>
    this.productsService.getProductsByType('patisseries'),
  );
}
