import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe.ts-pipe';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';
import { Course } from '../../shared/models/course.model';
import { CourseService } from '../../shared/sharedservices/admin/course';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  imports: [
    FormsModule,
    CommonModule,
    SafeUrlPipe,
    Sidebar,
    Header,
    HttpClientModule
  ],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css'],
})
export class Courses implements OnInit {
  courses: Course[] = [];
  selectedVideo: string | null = null;
  isVideoLoading: boolean = false;



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
            : []
      })) as Course[];
    },
    error: (err: any) => {
      console.error('❌ Error fetching courses:', err);
    }
  });
}

  onVideoLoad() {
    this.isVideoLoading = false; // hide loader once video is ready
  }



  playVideo(url: string) {
    this.selectedVideo = url;
  }

  closeVideo(event?: Event) {
    if (event) event.stopPropagation();
    this.selectedVideo = null;
        this.isVideoLoading = false;
            this.isVideoLoading = false;


  }

  get selectedVideoTitle(): string | null {
    const course = this.courses.find(c => c.videoUrl === this.selectedVideo);
    return course ? course.title : null;
  }

  coursesbtn() {
    this.router.navigate(['/student/courses']);
  }
}


