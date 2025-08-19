import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from './admin-auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private adminAuth: AdminAuthService, private router: Router) {}

  canActivate(): boolean {
    console.log("🔐 AdminGuard triggered!");
    if (this.adminAuth.isAuthenticated()) {
      console.log("✅ Allowed to access");
      return true;
    } else {
      console.log("❌ Not authenticated, redirecting to login");
      this.router.navigate(['/admin/login']);
      return false;
    }
  }

}
