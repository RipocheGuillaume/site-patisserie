import { Component } from '@angular/core';
import { BottomSectionComponent } from '../../components/bottom-section/bottom-section.component';
import { MiddleSectionComponent } from '../../components/middle-section/middle-section.component';
import { TopSectionComponent } from '../../components/top-section/top-section.component';

@Component({
  selector: 'app-home',
  imports: [
    MiddleSectionComponent,
    TopSectionComponent,
    BottomSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
