import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NotificationService, AppNotification } from '../../shared/sharedservices/notification';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../components/sidebar/sidebar';

@Component({
  selector: 'app-admin-notification',
  imports: [FormsModule,CommonModule,Sidebar],
  templateUrl: './admin-notification.html',
  styleUrls: ['./admin-notification.css']
})
export class AdminNotifications implements OnInit {
  notifications: AppNotification[] = [];
  selectedNotification: AppNotification | null = null;
  showModal = false;
  isLoading = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.isLoading = true;
    this.notificationService.getAll().subscribe({
      next: (data) => {
        this.notifications = data;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  addNotification() {
    this.selectedNotification = { title: '', message: '' };
    this.showModal = true;
  }

  editNotification(n: AppNotification) {
    this.selectedNotification = { ...n };
    this.showModal = true;
  }

  saveNotification() {
    if (!this.selectedNotification) return;

    if (this.selectedNotification._id) {
      // Update
      this.notificationService.update(this.selectedNotification._id, this.selectedNotification).subscribe(() => {
        Swal.fire('Updated', 'Notification updated!', 'success');
        this.closeModal();
        this.loadNotifications();
      });
    } else {
      // Create
      this.notificationService.create(this.selectedNotification).subscribe(() => {
        Swal.fire('Success', 'Notification created!', 'success');
        this.closeModal();
        this.loadNotifications();
      });
    }
  }

  deleteNotification(id?: string) {
    if (!id) return;
    Swal.fire({
      title: 'Are you sure?',
      text: 'This notification will be removed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    }).then((res) => {
      if (res.isConfirmed) {
        this.notificationService.delete(id).subscribe(() => {
          Swal.fire('Deleted', 'Notification removed.', 'success');
          this.loadNotifications();
        });
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.selectedNotification = null;
  }
}
