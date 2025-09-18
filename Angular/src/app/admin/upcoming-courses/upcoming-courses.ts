import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpcomingCoursesService } from '../../shared/sharedservices/upcoming-courses';
import { HttpClientModule } from '@angular/common/http';
import { Sidebar } from '../components/sidebar/sidebar';

@Component({
  selector: 'app-upcoming-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, HttpClientModule],
  templateUrl: './upcoming-courses.html',
  styleUrls: ['./upcoming-courses.css']
})
export class UpcomingCourses implements OnInit {
  isSidebarOpen = false;
  courses: UpcomingCourse[] = [];

  newCourse: UpcomingCourse = { title: '', description: '', startDate: '', duration: '', skills: [] };
  editingCourse: UpcomingCourse | null = null;

  // ✅ Loader state
  isLoading = true;

  constructor(private upcomingService: UpcomingCoursesService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  loadCourses() {
    this.isLoading = true;
    this.upcomingService.getAll().subscribe({
      next: (data) => {
        let rawCourses = Array.isArray(data) ? data : (data?.courses ?? []);

        this.courses = rawCourses.map((c: any) => ({
          ...c,
          description: c.description ?? '',
          skills: typeof c.skills === 'string'
            ? c.skills.split(',').map((s: string) => s.trim())
            : (c.skills ?? [])
        }));

        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching courses:', err);
        this.isLoading = false;
      }
    });
  }

  addCourse() {
    if (!this.newCourse.title || !this.newCourse.startDate || !this.newCourse.duration) return;

    this.isLoading = true;
    const payload: UpcomingCourse = {
      ...this.newCourse,
      startDate: new Date(this.newCourse.startDate).toISOString(),
      description: this.newCourse.description ?? '',
      skills: Array.isArray(this.newCourse.skills)
        ? this.newCourse.skills
        : (this.newCourse.skills ?? [])
    };

    this.upcomingService.add(payload).subscribe({
      next: () => {
        this.loadCourses();
        this.newCourse = { title: '', description: '', startDate: '', duration: '', skills: [] };
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error adding course:', err);
        this.isLoading = false;
      }
    });
  }

  editCourse(course: UpcomingCourse) {
    this.editingCourse = { ...course, description: course.description ?? '', skills: [...(course.skills ?? [])] };
  }

  updateCourse() {
    if (!this.editingCourse || !this.editingCourse._id) return;

    this.isLoading = true;
    const payload: UpcomingCourse = {
      ...this.editingCourse,
      startDate: new Date(this.editingCourse.startDate).toISOString(),
      description: this.editingCourse.description ?? '',
      skills: Array.isArray(this.editingCourse.skills)
        ? this.editingCourse.skills
        : (this.editingCourse.skills ?? [])
    };

    this.upcomingService.update(this.editingCourse._id, payload).subscribe({
      next: () => {
        this.loadCourses();
        this.editingCourse = null;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error updating course:', err);
        this.isLoading = false;
      }
    });
  }

  deleteCourse(id: string) {
    this.isLoading = true;
    this.upcomingService.delete(id).subscribe({
      next: () => {
        this.loadCourses();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error deleting course:', err);
        this.isLoading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}

export interface UpcomingCourse {
  _id?: string;
  title: string;
  description?: string;
  startDate: string;
  duration: string;
  skills?: string[];
}
