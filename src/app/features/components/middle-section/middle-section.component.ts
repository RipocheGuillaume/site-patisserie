import { Component, computed, inject } from '@angular/core';
import { TypesService } from '../../../core/services/types/types.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-middle-section',
  imports: [CardComponent],
  templateUrl: './middle-section.component.html',
  styleUrl: './middle-section.component.css',
})
export class MiddleSectionComponent {
  private readonly typesService = inject(TypesService);
  readonly cards = computed(() => this.typesService.selectTypeForHomePage());
}
