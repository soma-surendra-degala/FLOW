import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';


export interface RegisterData {
  name: string;
  email: string;
  password: string;
    location:string;
    gender: String
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
    location: ''  ,
    gender: ''
  };
  confirmPassword = '';

  constructor(private router: Router, private authService: AuthService) {}

  // Navigate to login page
  login() {
    this.router.navigate(['student/login']);
  }

  // Submit registration
  onRegister() {
    if (this.registerData.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: (res) => {
        alert('Registration successful!');
        this.router.navigate(['student/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        if (err.status === 400 && err.error?.message) {
          alert(err.error.message); // Show backend validation message
        } else {
          alert('Registration failed. Please try again.');
        }
      }
    });
  }
}
