import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 👇 Renamed interface to avoid conflict with browser Notification
export interface AppNotification {
  _id?: string;
  title: string;
  message: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private api = 'https://flow-hp2a.onrender.com/api/notifications'; // 👈 use your deployed URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(this.api);
  }

  create(data: AppNotification): Observable<AppNotification> {
    return this.http.post<AppNotification>(this.api, data);
  }

  update(id: string, data: AppNotification): Observable<AppNotification> {
    return this.http.put<AppNotification>(`${this.api}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
