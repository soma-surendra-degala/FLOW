import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpcomingCourse, UpcomingCoursesService } from '../../shared/sharedservices/admin/upcoming-courses';
import { Sidebar } from '../Admin-components/sidebar/sidebar';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-upcoming-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar,HttpClientModule],
  templateUrl: './upcoming-courses.html',
  styleUrls: ['./upcoming-courses.css']
})
export class UpcomingCourses implements OnInit {
  isSidebarOpen = false;
  courses: UpcomingCourse[] = [];

  // ✅ keep as string (backend expects string)
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
  this.upcomingService.getAll().subscribe({
    next: (data) => {
      console.log('📦 API Response:', data);  // 👀 What exactly do you see?
      if (Array.isArray(data)) {
        this.courses = data;
      } else if (data && 'courses' in data) {
        this.courses = data.courses;
      } else {
        this.courses = [];
      }
    },
    error: (err) => console.error('❌ Error fetching courses:', err)
  });
}


  // ✅ Add new course
  addCourse() {
    if (!this.newCourse.title || !this.newCourse.startDate || !this.newCourse.duration) {
      return;
    }

    const payload: UpcomingCourse = {
      ...this.newCourse,
      startDate: new Date(this.newCourse.startDate).toISOString() // always send ISO
    };

    console.log('Sending payload:', payload);

    this.upcomingService.add(payload).subscribe({
      next: () => {
        this.loadCourses();
        this.newCourse = { title: '', startDate: '', duration: '' };
      },
      error: (err) => console.error('Error adding course:', err)
    });
  }

  // ✅ Set editing course
  editCourse(course: UpcomingCourse) {
    this.editingCourse = { ...course };
  }

  // ✅ Update course
  updateCourse() {
    if (!this.editingCourse || !this.editingCourse._id) return;

    const payload: UpcomingCourse = {
      ...this.editingCourse,
      startDate: new Date(this.editingCourse.startDate).toISOString()
    };

    this.upcomingService.update(this.editingCourse._id, payload).subscribe({
      next: () => {
        this.loadCourses();
        this.editingCourse = null;
      },
      error: (err) => console.error('Error updating course:', err)
    });
  }

  // ✅ Delete course
  deleteCourse(id: string) {
    this.upcomingService.delete(id).subscribe({
      next: () => this.loadCourses(),
      error: (err) => console.error('Error deleting course:', err)
    });
  }

  // ✅ Utility: format date for template
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
