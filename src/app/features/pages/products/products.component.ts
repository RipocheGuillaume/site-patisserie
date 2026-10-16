import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { CardComponent } from '../../components/card/card.component';

const categoryTitles: Record<string, string> = {
  macarons: 'Nos macarons',
  patisseries: 'Nos pâtisseries',
  chocolats: 'Nos créations chocolatées',
  gateaux: 'Nos gâteaux',
};

@Component({
  selector: 'app-products',
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });
  private readonly productsService = inject(ProductsService);

  readonly type = computed(() => this.params().get('type') ?? '');
  readonly title = computed(
    () => categoryTitles[this.type()] ?? 'Nos créations',
  );
  readonly cards = computed(() =>
    this.productsService.getProductsByType(this.type()),
  );
}
