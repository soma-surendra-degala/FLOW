import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  constructor(private router:Router) {}
  login() {
    this.router.navigate(['student/login']);

  }

  onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Register Data:', this.registerData);
    // 🔗 Call AuthService here (API integration)
  }
}
