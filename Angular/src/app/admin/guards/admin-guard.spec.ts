import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin-guard';
import { AdminAuthService } from '../services/admin-auth';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let adminAuthServiceSpy: jasmine.SpyObj<AdminAuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    adminAuthServiceSpy = jasmine.createSpyObj('AdminAuthService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AdminAuthService, useValue: adminAuthServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AdminGuard);
  });

  it('should allow activation if authenticated', () => {
    adminAuthServiceSpy.isAuthenticated.and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
  });

  it('should deny activation and redirect if not authenticated', () => {
    adminAuthServiceSpy.isAuthenticated.and.returnValue(false);
    expect(guard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/login']);
  });
});