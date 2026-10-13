import { Component, computed, inject } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-middle-section',
  imports: [CardComponent],
  templateUrl: './middle-section.component.html',
  styleUrl: './middle-section.component.css',
})
export class MiddleSectionComponent {
  private readonly productsService = inject(ProductsService);
  readonly cards = computed(
    () => this.productsService.selectOneTypeByproduct() || [],
  );
}
