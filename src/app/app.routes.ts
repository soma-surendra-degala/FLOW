import { Routes } from '@angular/router';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },
  {path: 'services', loadComponent: () => import('./pages/ourservices/ourservices').then(m => m.Ourservices) },
  { path: 'interships', loadComponent: () => import('./pages/interships/interships').then(m => m.Interships) },
  { path: 'login', component:Login},
];
