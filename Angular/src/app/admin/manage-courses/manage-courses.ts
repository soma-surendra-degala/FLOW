import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

import { Sidebar } from '../Admin-components/sidebar/sidebar';
import { Course, CourseService } from '../../shared/sharedservices/admin/course';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe.ts-pipe';

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, Sidebar,SafeUrlPipe],
  templateUrl: './manage-courses.html',
  styleUrls: ['./manage-courses.css'],
})
export class ManageCourses implements OnInit {
  sidebarOpen = false;
  courses: Course[] = [];
  showModal = false;
  selectedCourse: Course | null = null;
  selectedFiles: File[] = [];
  isLoading = false;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  loadCourses() {
    this.isLoading = true;
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data.map((c: any) => ({
          ...c,
          skills: Array.isArray(c.skills)
            ? c.skills
            : typeof c.skills === 'string'
            ? (c.skills as string).split(',').map((s: string) => s.trim())
            : [],
          videos: Array.isArray(c.videos) ? c.videos : [],
          files: Array.isArray(c.files) ? c.files : [],
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching courses:', err);
        this.isLoading = false;
      },
    });
  }

  addCourse() {
    this.selectedCourse = {
      title: '',
      description: '',
      skills: [],
      icon: '',
      videos: [],
      files: [],
    };
    this.showModal = true;
  }

  editCourse(course: Course) {
    this.selectedCourse = { ...course };
    this.showModal = true;
  }

  addVideo() {
    if (!this.selectedCourse?.videos) this.selectedCourse!.videos = [];
    this.selectedCourse!.videos.push({ title: '', url: '' });
  }

  removeVideo(index: number) {
    this.selectedCourse?.videos.splice(index, 1);
  }

  onVideoSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length && this.selectedCourse?.videos[index]) {
      this.selectedCourse.videos[index].localFile = input.files[0];
      delete this.selectedCourse.videos[index].url;
    }
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const newFiles = Array.from(input.files).map((f) => ({
        name: f.name,
        url: '',
        localFile: f,
      }));
      this.selectedCourse?.files.push(...newFiles);
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
        Swal.fire('Deleted!', 'The file has been removed locally.', 'success');
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
        this.courseService.deleteCourse(id).subscribe({
          next: () => {
            this.loadCourses();
            Swal.fire('Deleted!', 'Course deleted successfully.', 'success');
          },
          error: (err) => {
            console.error('❌ Error deleting course:', err);
            Swal.fire('Error!', 'Failed to delete the course.', 'error');
          },
          complete: () => (this.isLoading = false),
        });
      }
    });
  }

  saveCourse() {
    if (!this.selectedCourse) return;
    this.isLoading = true;

    const request = this.selectedCourse._id
      ? this.courseService.updateCourse(this.selectedCourse)
      : this.courseService.addCourse(this.selectedCourse);

    request.subscribe({
      next: () => {
        this.loadCourses();
        this.closeModal();
      },
      error: (err) => {
        console.error('❌ Error saving course:', err);
      },
      complete: () => (this.isLoading = false),
    });
  }

  closeModal() {
    this.showModal = false;
    this.selectedCourse = null;
  }

  skillsToString(skills: string[] = []): string {
    return skills.join(', ');
  }

  updateSkills(value: string) {
    if (this.selectedCourse) {
      this.selectedCourse.skills = value
        .split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0);
    }
  }
}
