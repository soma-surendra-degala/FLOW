import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe.ts-pipe';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';

interface Course {
  title: string;
  description: string;
  progress: number;
  icon: string;
  videoUrl: string;
}

@Component({
  selector: 'app-courses',
  imports: [FormsModule,CommonModule, SafeUrlPipe,Sidebar,Header],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css'],
})
export class Courses {
  courses: Course[] = [
    {
      title: 'Angular Fundamentals',
      description: 'Learn the basics of Angular, components, and data binding.',
      progress: 65,
      icon: 'bi bi-code-slash',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      title: 'Node.js with MongoDB',
      description: 'Build scalable backends using Node.js and MongoDB.',
      progress: 40,
      icon: 'bi bi-server',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    },
    {
      title: 'Machine Learning Basics',
      description: 'Introduction to ML concepts and algorithms.',
      progress: 20,
      icon: 'bi bi-cpu',
      videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
    },
    {
      title: 'UI/UX Design Principles',
      description: 'Master design systems, wireframes, and prototyping.',
      progress: 90,
      icon: 'bi bi-brush',
      videoUrl: 'https://www.youtube.com/embed/a0Tft8IcYm0?si=mrzt6ATRs4XyALyj',
    },
  {
    title: 'Angular Basics',
    description: 'Learn Angular step by step',
    icon: 'bi bi-code-slash',
    progress: 60,
    videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo'
  },
  {
    title: 'TypeScript Mastery',
    description: 'Master TS fundamentals',
    icon: 'bi bi-lightning',
    progress: 40,
    videoUrl: 'assets/Video1.mp4'
  }

  ];

  selectedVideo: string | null = null;

  playVideo(url: string) {
    this.selectedVideo = url;
  }

    closeVideo(event?: Event) {
    if (event) {
      event.stopPropagation(); // Prevent background click issues
    }
    this.selectedVideo = null;
  }
  getProgressBarWidth(progress: number): string {
    return `${progress}%`;
  }
get selectedVideoTitle(): string | null {
    const course = this.courses.find(c => c.videoUrl === this.selectedVideo);
    return course ? course.title : null;
  }

}
