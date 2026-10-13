import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title = '';
  @Input() image = '';
  @Input() description = '';
  @Input() link = '';

  get categoryId(): string {
    return this.image.replace('images/', '').replace('.jpg', '');
  }
}
