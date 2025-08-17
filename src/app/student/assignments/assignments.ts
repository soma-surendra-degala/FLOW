import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';

@Component({
  selector: 'app-assignments',
  imports: [CommonModule,Sidebar,Header],
  templateUrl: './assignments.html',
  styleUrl: './assignments.css'
})
export class Assignments {
  assignments = [
    {
      title: 'Math Homework 1',
      description: 'Solve algebra problems from Chapter 3.',
      dueDate: '2025-08-20',
      timeLeft: '3 days',
      status: 'Pending'
    },
    {
      title: 'Science Project',
      description: 'Prepare a presentation on renewable energy.',
      dueDate: '2025-08-18',
      timeLeft: '1 day',
      status: 'Submitted'
    },
    {
      title: 'English Essay',
      description: 'Write an essay on Shakespeare’s influence.',
      dueDate: '2025-08-15',
      timeLeft: 'Overdue',
      status: 'Graded'
    }
  ];

  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}