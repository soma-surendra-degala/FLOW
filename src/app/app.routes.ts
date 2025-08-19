
import { Routes } from '@angular/router';

// Student Components
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './student/dashboard/dashboard';
import { Courses } from './student/courses/courses';

// Layouts
import { MainLayout } from './layouts/main-layout/main-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';

// Guards
import { authGuard } from './auth/guards/auth-guard';
import { AdminGuard } from './auth/admin/admin-guard';
import { ManagePractice } from './admin/manage-practice/manage-practice';
import { AdminLogin } from './admin/admin-login/admin-login';

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
      {
        path: 'practice',loadComponent: () => import('./student/practice/practice').then(m => m.Practice),
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./student/profile/profile').then((m) => m.Profile),
        canActivate: [authGuard],
      },
    ],
  },

  
// ---------- Admin Pages ----------
{
  path: 'admin',
  component: BlankLayout, 
  children: [
    {
      path: 'login',
      component: AdminLogin
    },
    {
      path: 'admin',   // ✅ clearer URL
      loadComponent: () =>
        import('./admin/admin').then((m) => m.Admin),
      canActivate: [AdminGuard]
    },
    { path: 'courses', loadComponent: () => import('./admin/manage-courses/manage-courses').then(m => m.ManageCourses) },
    {path:'practice', component: ManagePractice, canActivate: [AdminGuard]},
    {path: 'students', loadComponent: () => import('./admin/students/students').then(m => m.Students), canActivate: [AdminGuard]},
    { path: '', redirectTo: 'login', pathMatch: 'full' } // ✅ default
  ],
},



  // ---------- Public Pages ----------
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about').then((m) => m.About),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact').then((m) => m.Contact),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./pages/ourservices/ourservices').then(
            (m) => m.Ourservices
          ),
      },
      {
        path: 'interships',
        loadComponent: () =>
          import('./pages/interships/interships').then(
            (m) => m.Interships
          ),
      },
    ],
  },

  // Root redirect
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Fallback route
  { path: '**', redirectTo: 'home' },
];
