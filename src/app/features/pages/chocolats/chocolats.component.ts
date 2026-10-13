import { Component } from '@angular/core';
import { ChocolatsModel } from '../../../models/modelHome';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-chocolats',
  imports: [CardComponent],
  templateUrl: './chocolats.component.html',
  styleUrl: './chocolats.component.css',
})
export class ChocolatsComponent {
  cards = new ChocolatsModel().categories;
}
