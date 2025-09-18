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
  localFile?: File; // ✅ for new uploads
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
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'https://flow-hp2a.onrender.com/api/courses';

  constructor(private http: HttpClient) {}

  // Get all courses
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // Add a course
  addCourse(course: Course): Observable<Course> {
    const formData = this.buildFormData(course);
    return this.http.post<Course>(this.apiUrl, formData);
  }

  // Update a course
  updateCourse(course: Course): Observable<Course> {
    if (!course._id) throw new Error('Course ID is required for update');
    const formData = this.buildFormData(course);
    return this.http.put<Course>(`${this.apiUrl}/${course._id}`, formData);
  }

  // Delete a course
  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

private buildFormData(course: Course): FormData {
  const formData = new FormData();

  if (course.title) formData.append('title', course.title);
  if (course.description) formData.append('description', course.description);
  if (course.icon) {
  formData.append('icon', course.icon);
}


  if (Array.isArray(course.skills)) {
    formData.append('skills', course.skills.join(','));
  } else if (typeof course.skills === 'string') {
    formData.append('skills', course.skills);
  }

  (course.videos || []).forEach((v) => {
    if (v.localFile) {
      formData.append('videoFiles', v.localFile);
    } else if (v.url) {
      formData.append(
        'videos',
        JSON.stringify({ title: v.title, url: v.url })
      );
    }
  });

  (course.files || []).forEach((f) => {
    if (f.localFile) {
      formData.append('files', f.localFile);
    } else if (f.url) {
      formData.append('files', JSON.stringify({ name: f.name, url: f.url }));
    }
  });

  return formData;
}

}
