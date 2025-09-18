import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { ToasterService } from '../../shared/sharedservices/toaster';


export interface RegisterData {
  name: string;
  email: string;
  password: string;
  location: string;
  gender: string;
}

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerData: RegisterData = {
    name: '',
    email: '',
    password: '',
    location: '',
    gender: ''
  };
  confirmPassword = '';
  showPassword: boolean = false;
showConfirmPassword: boolean = false;


  constructor(
    private router: Router,
    private authService: AuthService,
    private toaster: ToasterService
  ) {}

  // Navigate to login page
  login() {
    this.router.navigate(['student/login']);
  }

  // Submit registration
  onRegister() {
    if (this.registerData.password !== this.confirmPassword) {
      this.toaster.show('Passwords do not match!', 'error'); 
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.toaster.show('Registration successful!', 'success'); 
        this.router.navigate(['student/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        if (err.status === 400 && err.error?.message) {
          this.toaster.show(err.error.message, 'error'); 
        } else {
          this.toaster.show('Registration failed. Please try again.', 'error');
        }
      }
    });
  }
}
