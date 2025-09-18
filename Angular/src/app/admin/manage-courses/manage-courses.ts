import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';
import { Sidebar } from '../components/sidebar/sidebar';

export interface Video {
  title: string;
  url?: string;
  localFile?: File;
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
  skills: string[];
  videos: Video[];
  files: FileItem[];
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
    this.selectedFiles = [];
    this.showModal = true;
  }

  editCourse(course: Course) {
    this.selectedCourse = {
      ...course,
      skills: course.skills || [],
      videos: course.videos || [],
      files: course.files || []
    };
    this.selectedFiles = [];
    this.showModal = true;
  }



  addVideo() {
    if (!this.selectedCourse?.videos) this.selectedCourse!.videos = [];
    this.selectedCourse!.videos.push({ title: '', url: '' });
  }

  removeVideo(index: number) {
    this.selectedCourse?.videos?.splice(index, 1);
  }

  onVideoSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0 && this.selectedCourse?.videos?.[index]) {
      const file = input.files[0];
      this.selectedCourse.videos[index].localFile = file;
      delete this.selectedCourse.videos[index].url;
    }
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  

removeFile(course: Course, index: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete this file?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      course.files.splice(index, 1);
      // 🔹 Optionally send delete request to server here
      Swal.fire('Deleted!', 'The file has been deleted.', 'success');
    }
  });
}

deleteCourse(id?: string) {
  if (!id) return;

  Swal.fire({
    title: 'Are you sure?',
    text: 'This course will be permanently deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      this.isLoading = true;
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.loadCourses();
          this.isLoading = false;
          Swal.fire('Deleted!', 'The course has been deleted.', 'success');
        },
        error: (err) => {
          console.error('❌ Error deleting course:', err);
          this.isLoading = false;
          Swal.fire('Error!', 'Failed to delete the course.', 'error');
        },
      });
    }
  });
}



  saveCourse() {
    if (!this.selectedCourse) return;
    this.isLoading = true;

    const formData = new FormData();
    formData.append('title', this.selectedCourse.title);
    formData.append('description', this.selectedCourse.description);
    formData.append('skills', this.selectedCourse.skills.join(','));
    formData.append('icon', this.selectedCourse.icon);

    // Videos
    this.selectedCourse.videos.forEach(v => {
      if (v.localFile) formData.append('videoFiles', v.localFile);
      else if (v.url) formData.append('videos', JSON.stringify([{ title: v.title, url: v.url }]));
    });

    // Files
    this.selectedFiles.forEach(f => formData.append('files', f));

    const request = this.selectedCourse._id
      ? this.http.put(`${this.apiUrl}/${this.selectedCourse._id}`, formData)
      : this.http.post(this.apiUrl, formData);

    request.subscribe({
      next: () => {
        this.loadCourses();
        this.closeModal();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error saving course:', err);
        this.isLoading = false;
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.selectedCourse = null;
    this.selectedFiles = [];
  }

  skillsToString(skills: string[] = []): string {
    return skills.join(', ');
  }

  updateSkills(value: string) {
    this.selectedCourse!.skills = value.split(',')
      .map((s: string) => s.trim())
      .filter(s => s.length > 0);
  }
}
