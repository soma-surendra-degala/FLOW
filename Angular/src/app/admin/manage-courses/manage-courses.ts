import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../Admin-components/sidebar/sidebar';

export interface Video {
  title: string;
  url: string;
}

export interface FileItem {
  name: string;
  url: string;
}

export interface Course {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  skills: string[];             // ✅ always array
  videos: Video[];              // ✅ always array
  files: FileItem[];            // ✅ always array
}

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  imports: [FormsModule, CommonModule, Sidebar, HttpClientModule],
  templateUrl: './manage-courses.html',
  styleUrls: ['./manage-courses.css']
})
export class ManageCourses implements OnInit {
  sidebarOpen = false;
  courses: Course[] = [];
  showModal = false;
  selectedCourse: Course | null = null;
  selectedFiles: File[] = [];
  isLoading = false;

  private apiUrl = 'https://flow-hp2a.onrender.com/api/courses';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  loadCourses() {
    this.isLoading = true;
    this.http.get<Course[]>(this.apiUrl).subscribe({
      next: (data: any[]) => {
        this.courses = data.map(course => ({
          ...course,
          skills: Array.isArray(course.skills)
            ? course.skills
            : typeof course.skills === 'string'
              ? course.skills.split(',').map((s: string) => s.trim())
              : [],
          videos: Array.isArray(course.videos) ? course.videos : [],
          files: Array.isArray(course.files) ? course.files : []
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
    this.selectedCourse = {
      title: '',
      description: '',
      skills: [],
      icon: '',
      videos: [],
      files: []
    };
    this.showModal = true;
  }

  editCourse(course: Course) {
    this.selectedCourse = {
      ...course,
      skills: Array.isArray(course.skills) ? course.skills : []
    };
    this.showModal = true;
  }

  deleteCourse(id?: string) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this course?')) {
      this.isLoading = true;
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.loadCourses();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('❌ Error deleting course:', err);
          this.isLoading = false;
        },
      });
    }
  }

  // Add new video row
  addVideo() {
    if (this.selectedCourse) {
      this.selectedCourse.videos.push({ title: '', url: '' });
    }
  }

  removeVideo(index: number) {
    if (this.selectedCourse) {
      this.selectedCourse.videos.splice(index, 1);
    }
  }

  // Handle multiple file selection
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  saveCourse() {
    if (!this.selectedCourse) return;

    this.isLoading = true;
    const formData = new FormData();
    formData.append('title', this.selectedCourse.title);
    formData.append('description', this.selectedCourse.description);
    formData.append('skills', this.selectedCourse.skills.join(',')); // ✅ always string
    formData.append('icon', this.selectedCourse.icon);

    // Videos
    formData.append('videos', JSON.stringify(this.selectedCourse.videos));

    // Files
    this.selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    if (this.selectedCourse._id) {
      this.http.put(`${this.apiUrl}/${this.selectedCourse._id}`, formData).subscribe({
        next: () => {
          this.loadCourses();
          this.closeModal();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('❌ Error updating course:', err);
          this.isLoading = false;
        },
      });
    } else {
      this.http.post(this.apiUrl, formData).subscribe({
        next: () => {
          this.loadCourses();
          this.closeModal();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('❌ Error adding course:', err);
          this.isLoading = false;
        },
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedCourse = null;
    this.selectedFiles = [];
  }

  // Convert skills array to string for input binding
skillsToString(skills: string[] = []): string {
  return skills.join(', ');
}

// Convert input string back to array when user types
updateSkills(value: string) {
  this.selectedCourse!.skills = value.split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

}
