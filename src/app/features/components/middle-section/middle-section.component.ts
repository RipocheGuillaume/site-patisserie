import { Component } from '@angular/core';
import { HomeModel } from '../../../models/modelHome';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-middle-section',
  imports: [CardComponent],
  templateUrl: './middle-section.component.html',
  styleUrl: './middle-section.component.css',
})
export class MiddleSectionComponent {
  readonly cards = new HomeModel().categories;
}
