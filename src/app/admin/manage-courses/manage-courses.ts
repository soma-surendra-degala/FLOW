import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../Admin-components/sidebar/sidebar';

interface Course {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  videoUrl?: string;
  fileUrl?: string;
}


@Component({
  selector: 'app-manage-courses',
  standalone:true,
  imports:[FormsModule,CommonModule,Sidebar,HttpClientModule],
  templateUrl: './manage-courses.html',
  styleUrls: ['./manage-courses.css']
})
export class ManageCourses implements OnInit {
  sidebarOpen = false;
  courses: Course[] = [];
  showModal = false;
  selectedCourse: Course | null = null;
  selectedFile: File | null = null;

  private apiUrl = 'http://localhost:5000/api/courses'; // ✅ backend URL

  constructor(private http: HttpClient) {
    console.log("📘 ManageCourses Loaded!");
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  loadCourses() {
    this.http.get<Course[]>(this.apiUrl).subscribe({
      next: (data) => (this.courses = data),
      error: (err) => console.error('❌ Error loading courses:', err),
    });
  }

  addCourse() {
    this.selectedCourse = { title: '', description: '', icon: '', videoUrl: '', fileUrl: '' };
    this.showModal = true;
  }

  editCourse(course: Course) {
    this.selectedCourse = { ...course };
    this.showModal = true;
  }

  deleteCourse(id?: string) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this course?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => this.loadCourses(),
        error: (err) => console.error('❌ Error deleting course:', err),
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  saveCourse() {
    if (!this.selectedCourse) return;

    const formData = new FormData();
    formData.append('title', this.selectedCourse.title);
    formData.append('description', this.selectedCourse.description);
    formData.append('icon', this.selectedCourse.icon);
    if (this.selectedCourse.videoUrl) {
      formData.append('videoUrl', this.selectedCourse.videoUrl);
    }
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    if (this.selectedCourse._id) {
      // Update
      this.http.put(`${this.apiUrl}/${this.selectedCourse._id}`, formData).subscribe({
        next: () => {
          this.loadCourses();
          this.closeModal();
        },
        error: (err) => console.error('❌ Error updating course:', err),
      });
    } else {
      // Create
      this.http.post(this.apiUrl, formData).subscribe({
        next: () => {
          this.loadCourses();
          this.closeModal();
        },
        error: (err) => console.error('❌ Error adding course:', err),
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedCourse = null;
    this.selectedFile = null;
  }
}
