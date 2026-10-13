import { Routes } from '@angular/router';
import { ChocolatsComponent } from './features/pages/chocolats/chocolats.component';
import { HomeComponent } from './features/pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chocolats', component: ChocolatsComponent },
  { path: '**', redirectTo: '' },
];
