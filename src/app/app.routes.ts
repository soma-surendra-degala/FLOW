import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './student/dashboard/dashboard';
import { Courses } from './student/courses/courses';
import { MainLayout } from './layouts/main-layout/main-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { authGuard } from './auth/guards/auth-guard';
export const routes: Routes = [
  // ---------- Student Pages (Protected) ----------
  {
    path: 'student',
    component: BlankLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
      { path: 'courses', component: Courses, canActivate: [authGuard] },
      {path: 'assignments', loadComponent: () => import('./student/assignments/assignments').then(m => m.Assignments), canActivate: [authGuard] },
      {path: 'profile', loadComponent: () => import('./student/profile/profile').then(m => m.Profile), canActivate: [authGuard] },
    ]
  },

  // ---------- Public Pages ----------
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
      { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
      { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About) },
      { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },
      { path: 'services', loadComponent: () => import('./pages/ourservices/ourservices').then(m => m.Ourservices) },
      { path: 'interships', loadComponent: () => import('./pages/interships/interships').then(m => m.Interships) },  // fixed spelling
      { path: 'admin', loadComponent: () => import('./pages/admin/admin').then(m => m.Admin) },
    ]
  },

  // Root redirect
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Fallback route
  { path: '**', redirectTo: 'home' }
];
