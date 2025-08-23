import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../../models/ticket.model';  


@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private apiUrl = 'http://localhost:5000/api/support';

  constructor(private http: HttpClient) {}

  
  // ✅ Add headers with token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('studentToken'); // adjust key if different
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

createTicket(ticket: { subject: string; message: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}`, ticket, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('studentToken') || ''}`
    }
  });
}


  // // Student
  // getMyTickets(): Observable<Ticket[]> {
  //   return this.http.get<Ticket[]>(`${this.apiUrl}/my-tickets`);
  // }

  getMyTickets(): Observable<Ticket[]> {
  return this.http.get<Ticket[]>(`${this.apiUrl}/my-tickets`, {
    headers: this.getHeaders()
  });
}


  // submitTicket(ticket: Ticket): Observable<Ticket> {
  //   return this.http.post<Ticket>(`${this.apiUrl}`, ticket);
  // }

  

  // Admin
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}`);
  }

  updateStatus(ticketId: string, status: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${ticketId}`, { status });
  }
  
replyToTicket(ticketId: string, message: string) {
  return this.http.post(`${this.apiUrl}/${ticketId}/reply`, { message }, {
    headers: this.getHeaders()
  });
}


  deleteTicket(ticketId: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${ticketId}`);
  }
}
