import { Routes } from '@angular/router';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { HomeModel } from './models/modelHome';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

