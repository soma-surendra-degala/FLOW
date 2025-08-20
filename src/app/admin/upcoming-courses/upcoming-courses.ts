import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpcomingCourse, UpcomingCoursesService } from '../../shared/sharedservices/admin/upcoming-courses';
import { Sidebar } from '../Admin-components/sidebar/sidebar';

@Component({
  selector: 'app-upcoming-courses',
  standalone: true,
  imports: [CommonModule, FormsModule,Sidebar],
  templateUrl: './upcoming-courses.html',
  styleUrls: ['./upcoming-courses.css']
})
export class UpcomingCourses implements OnInit {
  isSidebarOpen = false;
  courses: UpcomingCourse[] = [];
  newCourse: UpcomingCourse = { title: '', startDate: '', duration: '' };
  editingCourse: UpcomingCourse | null = null;

  constructor(private upcomingService: UpcomingCoursesService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

    toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  loadCourses() {
    this.upcomingService.getAll().subscribe(data => {
      this.courses = data;
    });
  }
addCourse() {
  if (!this.newCourse.title || !this.newCourse.startDate || !this.newCourse.duration) {
    return;
  }

  const payload = {
    ...this.newCourse,
    startDate: new Date(this.newCourse.startDate).toISOString()
  };

  console.log("Sending payload:", payload); // debug

  this.upcomingService.add(payload).subscribe({
    next: (res) => {
      console.log("Course added:", res);
      this.loadCourses();
      this.newCourse = { title: '', startDate: '', duration: '' };
    },
    error: (err) => {
      console.error("Error adding course:", err);
    }
  });
}


  editCourse(course: UpcomingCourse) {
    this.editingCourse = { ...course };
  }

  updateCourse() {
    if (!this.editingCourse || !this.editingCourse._id) return;
    this.upcomingService.update(this.editingCourse._id, this.editingCourse).subscribe(() => {
      this.loadCourses();
      this.editingCourse = null;
    });
  }

  deleteCourse(id: string) {
    this.upcomingService.delete(id).subscribe(() => {
      this.loadCourses();
    });
  }
}
