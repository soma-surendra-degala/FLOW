import { Routes } from '@angular/router';

// Layouts
import { MainLayout } from './layouts/main-layout/main-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';

// Guards
import { authGuard } from './auth/guards/auth-guard';
import { AdminGuard } from './auth/admin/admin-guard';

export const routes: Routes = [
  // -------------------- Student Routes --------------------
  {
    path: 'student',
    component: BlankLayout,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/register/register').then((m) => m.Register),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./student/dashboard/dashboard').then((m) => m.Dashboard),
        canActivate: [authGuard],
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./student/courses/courses').then((m) => m.Courses),
        canActivate: [authGuard],
      },
      {
        path: 'skills',
        loadComponent: () =>
          import('./student/practice-skills/practice-skills').then(
            (m) => m.PracticeSkills
          ),
        canActivate: [authGuard],
      },
      {
        path: 'practice',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./student/practice/practice').then((m) => m.Practices),
            canActivate: [authGuard],
          },
          {
            path: ':skill',
            loadComponent: () =>
              import('./student/practice/practice').then((m) => m.Practices),
            canActivate: [authGuard],
          },
        ],
      },
      {
        path: 'upcoming-courses',
        loadComponent: () =>
          import(
            './student/student-upcoming-courses/student-upcoming-courses'
          ).then((m) => m.StudentUpcomingCourses),
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./student/profile/profile').then((m) => m.Profile),
        canActivate: [authGuard],
      },
      {
        path: 'support',
        loadComponent: () =>
          import('./student/student-support/student-support').then(
            (m) => m.StudentSupport
          ),
        canActivate: [authGuard],
      },
      {
        path: 'careers',
        loadComponent: () =>
          import('./Careers/student-careers/student-careers').then(
            (m) => m.StudentCareers
          ),
        canActivate: [authGuard],
      },
    ],
  },

  // -------------------- Admin Routes --------------------
  {
    path: 'admin',
    component: BlankLayout,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./admin/admin-login/admin-login').then((m) => m.AdminLogin),
      },
      {
        path: '',
        loadComponent: () => import('./admin/admin').then((m) => m.Admin),
        canActivate: [AdminGuard],
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./admin/manage-courses/manage-courses').then(
            (m) => m.ManageCourses
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'practice',
        loadComponent: () =>
          import('./admin/manage-practice/manage-practice').then(
            (m) => m.ManagePractice
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'upcoming-courses',
        loadComponent: () =>
          import('./admin/upcoming-courses/upcoming-courses').then(
            (m) => m.UpcomingCourses
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'support',
        loadComponent: () =>
          import('./admin/admin-support/admin-support').then(
            (m) => m.AdminSupport
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'students/:id',
        loadComponent: () =>
          import('./admin/student-details/student-details').then(
            (m) => m.AdminStudentDetail
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./admin/students/students').then((m) => m.Students),
        canActivate: [AdminGuard],
      },
      {
        path: 'careers',
        loadComponent: () =>
          import('./Careers/admin-careers/admin-careers').then(
            (m) => m.AdminCareers
          ),
        canActivate: [AdminGuard],
      },
    ],
  },

  // -------------------- Public Pages --------------------
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then((m) => m.About),
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
        path: 'internships',
        loadComponent: () =>
          import('./pages/interships/interships').then((m) => m.Interships),
      },
    ],
  },

  // -------------------- Fallbacks --------------------
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
