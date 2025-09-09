import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Video {
  title: string;
  url?: string;
  isYouTube?: boolean;
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

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://flow-hp2a.onrender.com/api/courses';

  constructor(private http: HttpClient) {}

  // Get all courses
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // Add a course (with files/videos)
  addCourse(course: Course): Observable<Course> {
    const formData = this.buildFormData(course);
    return this.http.post<Course>(this.apiUrl, formData);
  }

  // Update a course (with files/videos)
  updateCourse(course: Course): Observable<Course> {
    if (!course._id) throw new Error('Course ID is required for update');
    const formData = this.buildFormData(course);
    return this.http.put<Course>(`${this.apiUrl}/${course._id}`, formData);
  }

  // Delete a course
  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Helper to build FormData for files/videos
  private buildFormData(course: Course): FormData {
    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('description', course.description);
    formData.append('icon', course.icon);
    formData.append('skills', course.skills.join(','));

    // Append videos
    course.videos.forEach(v => {
      if (v.localFile) {
        formData.append('videoFiles', v.localFile);
      } else if (v.url) {
        formData.append('videos', JSON.stringify([{ title: v.title, url: v.url }]));
      }
    });

    // Append files
    course.files.forEach(f => {
      // Backend expects files in "files" field; here only uploaded files
      if ((f as any).localFile) formData.append('files', (f as any).localFile);
      // Already uploaded files can be sent as JSON string
      else formData.append('files', JSON.stringify([{ name: f.name, url: f.url }]));
    });

    return formData;
  }
}
