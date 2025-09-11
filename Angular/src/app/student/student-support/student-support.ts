import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Header } from '../Student-components/header/header';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { SupportService } from '../../shared/sharedservices/admin/support';
import { Ticket } from '../../shared/models/ticket.model';
import { ToasterService } from '../../shared/sharedservices/admin/toaster'; // ✅ import toaster

@Component({
  selector: 'app-student-support',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Sidebar, HttpClientModule],
  templateUrl: './student-support.html',
  styleUrls: ['./student-support.css']
})
export class StudentSupport implements OnInit {
  ticket = { subject: '', message: '' };
  myTickets: Ticket[] = [];
  editMode = false;
  editingTicketId: string | null = null;
  loading = true;

  constructor(
    private supportService: SupportService,
    private toaster: ToasterService // ✅ inject toaster
  ) {}

  ngOnInit(): void {
    this.loadMyTickets();
  }

  loadMyTickets() {
    this.loading = true;
    this.supportService.getMyTickets().subscribe({
      next: (tickets) => {
        this.myTickets = tickets;
        this.loading = false;
        
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
        this.toaster.show('❌ Failed to load tickets', 'error'); // ✅ toaster
      }
    });
  }

  submitTicket() {
    if (this.editMode && this.editingTicketId) {
      const originalTicket = this.myTickets.find(t => t._id === this.editingTicketId);
      if (!originalTicket) {
        this.toaster.show('⚠️ Original ticket not found', 'warning');
        return;
      }

      const updatedTicket = {
        ...originalTicket,
        subject: this.ticket.subject,
        message: this.ticket.message
      };

      this.supportService.updateTicket(this.editingTicketId, updatedTicket).subscribe({
        next: () => {
          this.resetForm();
          this.loadMyTickets();
        },
        error: (err: any) => {
          console.error('Update failed:', err);
          this.toaster.show('❌ Failed to update ticket', 'error'); // ✅ toaster
        }
      });
    } else {
      this.supportService.createTicket(this.ticket).subscribe({
        next: () => {
          this.resetForm();
          this.loadMyTickets();
        },
        error: (err: any) => {
          console.error('Create failed:', err);
          this.toaster.show('❌ Failed to create ticket', 'error'); // ✅ toaster
        }
      });
    }
  }

  editTicket(ticket: Ticket) {
    this.ticket = { subject: ticket.subject, message: ticket.message };
    this.editMode = true;
    this.editingTicketId = ticket._id ?? null;
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.ticket = { subject: '', message: '' };
    this.editMode = false;
    this.editingTicketId = null;
  }

  deleteReply(ticketId: string | undefined, replyId: string | undefined) {
    if (!ticketId || !replyId) return;
    this.supportService.deleteReply(ticketId, replyId).subscribe({
      next: () => {
        this.loadMyTickets();
        this.toaster.show('🗑️ Reply deleted successfully', 'success'); // ✅ toaster
      },
      error: (err: any) => {
        console.error(err);
        this.toaster.show('❌ Failed to delete reply', 'error'); // ✅ toaster
      }
    });
  }

  deleteTicket(ticketId: string | undefined) {
    if (!ticketId) return;
    this.supportService.deleteTicket(ticketId).subscribe({
      next: () => {
        this.loadMyTickets();
        this.toaster.show('🗑️ Ticket deleted successfully', 'success'); // ✅ toaster
      },
      error: (err: any) => {
        console.error(err);
        this.toaster.show('❌ Failed to delete ticket', 'error'); // ✅ toaster
      }
    });
  }
}
