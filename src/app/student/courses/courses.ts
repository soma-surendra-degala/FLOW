import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';


interface Course {
  title: string;
  description: string;
  instructor: string;
  progress: number; // percentage
}

@Component({
  selector: 'app-courses',
  styleUrls: ['./courses.css'],
  imports: [CommonModule,Sidebar,Header],
  templateUrl: './courses.html',
})
export class Courses {
  // Dummy student courses (can be fetched later from API)
  courses = [
    {
      title: 'Angular Fundamentals',
      description: 'Learn the basics of Angular, components, and data binding.',
      progress: 65,
      icon: 'bi bi-code-slash'
    },
    {
      title: 'Node.js with MongoDB',
      description: 'Build scalable backends using Node.js and MongoDB.',
      progress: 40,
      icon: 'bi bi-server'
    },
    {
      title: 'Machine Learning Basics',
      description: 'Introduction to ML concepts and algorithms.',
      progress: 20,
      icon: 'bi bi-cpu'
    },
    {
      title: 'UI/UX Design Principles',
      description: 'Master design systems, wireframes, and prototyping.',
      progress: 90,
      icon: 'bi bi-brush'
    }
  ];
  constructor(private router: Router) {}
  navigate(path: string) {
  this.router.navigate([`/student/${path}`]);
}

}
