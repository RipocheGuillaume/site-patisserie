import { CanMatchFn, Routes } from '@angular/router';
import { productTypes } from './core/interfaces/products.model';
import { HomeComponent } from './features/pages/home/home.component';
import { ProductsComponent } from './features/pages/products/products.component';
import { LoginComponent } from './features/pages/login/login.component';
import { AdminComponent } from './features/pages/admin/admin.component';
import { authGuard } from './core/guards/auth.guard';

const isProductCategory: CanMatchFn = (_, segments) =>
  productTypes.some((type) => type === segments[0]?.path);

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: ':type',
    component: ProductsComponent,
    canMatch: [isProductCategory],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
