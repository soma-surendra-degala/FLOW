import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../Admin-components/sidebar/sidebar';

interface Course {
  id: number;
  title: string;
  description: string;
  icon: string;
  videoUrl: string;
}

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  imports: [FormsModule, CommonModule, Sidebar],
  templateUrl: './manage-courses.html',
  styleUrls: ['./manage-courses.css']
})
export class ManageCourses {
 sidebarOpen = false;

toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}

  courses: Course[] = [
    {
      id: 1,
      title: 'Angular Basics',
      description: 'Learn Angular step by step',
      icon: 'bi bi-code-slash',
      videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',

    },
    {
      id: 2,
      title: 'Machine Learning 101',
      description: 'Introduction to machine learning concepts',
      icon: 'bi bi-cpu',
      videoUrl: '',

    },
    {
      id: 3,
      title: 'Cloud Computing',
      description: 'Basics of cloud services and deployments',
      icon: 'bi bi-cloud',
      videoUrl: '',

    }
  ];

  selectedCourse: Course | null = null;
  showModal = false;

  addCourse() {
    this.selectedCourse = {
      id: 0,
      title: '',
      description: '',
      icon: '',
      videoUrl: '',
    };
    this.showModal = true;
  }

  editCourse(course: Course) {
    this.selectedCourse = { ...course };
    this.showModal = true;
  }

  saveCourse() {
    if (this.selectedCourse) {
      if (this.selectedCourse.id === 0) {
        this.selectedCourse.id = this.courses.length + 1;
        this.courses.push(this.selectedCourse);
      } else {
        const index = this.courses.findIndex(c => c.id === this.selectedCourse!.id);
        this.courses[index] = this.selectedCourse;
      }
      this.closeModal();
    }
  }

  deleteCourse(id: number) {
    this.courses = this.courses.filter(c => c.id !== id);
  }

  closeModal() {
    this.showModal = false;
    this.selectedCourse = null;
  }
}
