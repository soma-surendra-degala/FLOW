import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule , Sidebar,Header],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile  {
 profile = {
    name: 'Soma Surendra Degala',
    email: 'soma@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'Student',
    enrollment: 'STU2025-001',
    course: 'B.Tech Computer Science',
    year: '3rd Year',
    phone: '+91 98765 43210',
    progress: 72
  };
}