import { Routes } from '@angular/router';

// Layouts
import { MainLayout } from './layouts/main-layout/main-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';

// Guards
import { authGuard } from './auth/guards/auth-guard';
import { AdminGuard } from './auth/admin/admin-guard';

// Student Components (non-lazy loaded)
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './student/dashboard/dashboard';
import { Courses } from './student/courses/courses';
import { StudentSupport } from './student/student-support/student-support';

// Admin Components (non-lazy loaded)
import { AdminLogin } from './admin/admin-login/admin-login';
import { ManageCourses } from './admin/manage-courses/manage-courses';
import { ManagePractice } from './admin/manage-practice/manage-practice';
import { UpcomingCourses } from './admin/upcoming-courses/upcoming-courses';
import { AdminSupport } from './admin/admin-support/admin-support';
import { AdminCareers } from './Careers/admin-careers/admin-careers';
import { StudentCareers } from './Careers/student-careers/student-careers';

export const routes: Routes = [
  // -------------------- Student Routes --------------------
  {
    path: 'student',
    component: BlankLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },

      // Protected routes
      { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
      { path: 'courses', component: Courses, canActivate: [authGuard] },

      {
        path: 'skills',
        loadComponent: () =>
          import('./student/practice-skills/practice-skills').then(
            (m) => m.PracticeSkills
          ),
        canActivate: [authGuard],
      },

      // ✅ Practice page (supports /practice and /practice/:skill)
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
      { path: 'support', component: StudentSupport, canActivate: [authGuard] },
      {path:'careers',component:StudentCareers,canActivate:[authGuard]}
    ],
  },

  // -------------------- Admin Routes --------------------
  {
    path: 'admin',
    component: BlankLayout,
    children: [
      { path: 'login', component: AdminLogin },

      // Protected Admin Dashboard
      {
        path: '',
        loadComponent: () => import('./admin/admin').then((m) => m.Admin),
        canActivate: [AdminGuard],
      },
      { path: 'courses', component: ManageCourses, canActivate: [AdminGuard] },
      { path: 'practice', component: ManagePractice, canActivate: [AdminGuard] },
      {
        path: 'upcoming-courses',
        component: UpcomingCourses,
        canActivate: [AdminGuard],
      },
      { path: 'support', component: AdminSupport, canActivate: [AdminGuard] },
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
        component:AdminCareers,
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
          import('./pages/interships/interships').then(
            (m) => m.Interships
          ),
      },
    ],
  },

  // -------------------- Fallbacks --------------------
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
