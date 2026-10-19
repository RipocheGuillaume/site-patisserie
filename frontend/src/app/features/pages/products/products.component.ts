import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { catchError, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { ProductsService } from '../../../core/services/products/products.service';
import { CardComponent } from '../../components/card/card.component';

const categoryTitles: Record<string, string> = {
  macarons: 'Nos macarons', patisseries: 'Nos pâtisseries',
  chocolats: 'Nos créations chocolatées', gateaux: 'Nos gâteaux',
};

@Component({
  selector: 'app-products',
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  private readonly productsService = inject(ProductsService);
  readonly type = computed(() => this.params().get('type') ?? '');
  readonly title = computed(() => categoryTitles[this.type()] ?? 'Nos créations');
  readonly error = signal('');
  readonly products = toSignal(this.route.paramMap.pipe(
    map((params) => params.get('type') ?? ''),
    distinctUntilChanged(),
    switchMap((type) => {
      this.error.set('');
      return this.productsService.getByType(type).pipe(
        catchError(() => {
          this.error.set('Impossible de charger les produits. Réessayez plus tard.');
          return of([]);
        }),
      );
    }),
  ), { initialValue: [] });
}
