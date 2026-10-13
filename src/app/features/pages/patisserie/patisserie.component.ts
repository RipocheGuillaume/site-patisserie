import { Component, signal } from '@angular/core';
import { PatisseriesModel } from '../../../models/modelHome';
import { CardComponent } from '../../components/card/card.component';

type Patisserie = PatisseriesModel['categories'][number];

@Component({
  selector: 'app-patisserie',
  imports: [CardComponent],
  templateUrl: './patisserie.component.html',
  styleUrl: './patisserie.component.css',
})
export class PatisserieComponent {
  cards = new PatisseriesModel().categories;
  selectedPatisserie = signal<Patisserie | null>(null);
}
