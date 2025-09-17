import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';
import { Course } from '../../shared/models/course.model';
import { CourseService } from '../../shared/sharedservices/admin/course';
import { HttpClientModule } from '@angular/common/http';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe.ts-pipe';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, CommonModule, SafeUrlPipe, Sidebar, Header, HttpClientModule],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css'],
})
export class Courses implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  currentVideo: { title: string; url: string } | null = null;
  isVideoLoading = false;
  currentIndex = 0;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data: any[]) => {
        this.courses = data.map(course => ({
          ...course,
          skills: Array.isArray(course.skills)
            ? course.skills
            : typeof course.skills === 'string'
              ? course.skills.split(',').map((s: string) => s.trim())
              : [],
          videos: Array.isArray(course.videos) ? course.videos : [],
          files: Array.isArray(course.files) ? course.files : [],
        })) as Course[];
      },
      error: err => console.error('❌ Error fetching courses:', err),
    });
  }

  onVideoLoad() {
    this.isVideoLoading = false;
  }

  closeVideo(event?: Event) {
    if (event) event.stopPropagation();
    this.selectedCourse = null;
    this.currentVideo = null;
    this.isVideoLoading = false;
  }

  openCourse(course: Course) {
    this.selectedCourse = course;
    if (course.videos?.length) {
      this.currentIndex = 0;
      this.currentVideo = { ...course.videos[0] };
      this.isVideoLoading = true;
    }
  }

  playFromPlaylist(video: { title: string; url: string }, index: number) {
    if (!video?.url) return;
    this.currentIndex = index;
    this.currentVideo = { ...video };
    this.isVideoLoading = true;
  }

  prevVideo() {
    if (this.selectedCourse && this.currentIndex > 0) {
      this.playFromPlaylist(this.selectedCourse.videos![this.currentIndex - 1], this.currentIndex - 1);
    }
  }

  nextVideo() {
    if (this.selectedCourse && this.currentIndex < this.selectedCourse.videos!.length - 1) {
      this.playFromPlaylist(this.selectedCourse.videos![this.currentIndex + 1], this.currentIndex + 1);
    }
  }

  downloadFile(url: string, filename: string) {
    // ✅ Cloudinary supports direct download with `?dl=`
    const link = document.createElement('a');
    link.href = url.includes('cloudinary')
      ? `${url}?dl=${encodeURIComponent(filename)}`
      : url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  get currentVideoTitle(): string {
    if (this.selectedCourse?.videos && this.currentIndex < this.selectedCourse.videos.length) {
      return this.selectedCourse.videos[this.currentIndex]?.title || 'Watch Course';
    }
    return 'Watch Course';
  }

  get isCurrentVideoMp4(): boolean {
    return !!this.currentVideo?.url && this.currentVideo.url.toLowerCase().endsWith('.mp4');
  }
}
