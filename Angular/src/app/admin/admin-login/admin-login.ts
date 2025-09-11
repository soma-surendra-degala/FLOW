import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../auth/admin/admin-auth';
import { ToasterService } from '../../shared/sharedservices/admin/toaster';


@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css']
})
export class AdminLogin implements OnInit {
  loginForm!: FormGroup;   // declare but not init

  constructor(
    private fb: FormBuilder,
    private adminAuth: AdminAuthService,
    private router: Router,
    private toaster: ToasterService   // 👈 inject toaster
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;

    if (email && password && this.adminAuth.login(email, password)) {
      console.log('✅ Admin logged in successfully');

      this.toaster.show('Admin logged in successfully!', 'success');
      this.router.navigate(['/admin']);
    } else {
      console.log('❌ Invalid admin credentials');

      this.toaster.show('Invalid admin credentials', 'error');
    }
  }
}
