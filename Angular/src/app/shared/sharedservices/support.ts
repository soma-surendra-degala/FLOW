import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../components/models/ticket.model';  


@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private apiUrl = 'https://flow-hp2a.onrender.com/api/support';

  constructor(private http: HttpClient) {}

  
  // ✅ Add headers with token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('studentToken'); // adjust key if different
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }


updateTicket(ticketId: string, updatedData: { subject?: string; message?: string }): Observable<any> {
  return this.http.put(`${this.apiUrl}/update/${ticketId}`, updatedData, {
    headers: this.getHeaders()
  });
}



createTicket(ticket: { subject: string; message: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}`, ticket, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('studentToken') || ''}`
    }
  });
}

  getMyTickets(): Observable<Ticket[]> {
  return this.http.get<Ticket[]>(`${this.apiUrl}/my-tickets`, {
    headers: this.getHeaders()
  });
}

  // Admin
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}`);
  }

  updateStatus(ticketId: string, status: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${ticketId}`, { status });
  }
  

 replyToTicket(ticketId: string, data: { sender: string; message: string }): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/${ticketId}/reply`, data);
  }

editReply(ticketId: string, replyId: string, message: string): Observable<Ticket> {
  return this.http.put<Ticket>(
    `${this.apiUrl}/${ticketId}/reply/${replyId}`, 
    { message },
    { headers: this.getHeaders() } // include token if needed
  );
}



deleteReply(ticketId: string, replyId: string): Observable<Ticket> {
  const token = localStorage.getItem('token');
  return this.http.delete<Ticket>(
    `${this.apiUrl}/${ticketId}/reply/${replyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}



  deleteTicket(ticketId: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${ticketId}`);
  }
}
