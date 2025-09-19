import { Component, OnInit } from '@angular/core';
import { NotificationService, AppNotification } from '../../shared/sharedservices/notification';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../components/sidebar/sidebar';

@Component({
  selector: 'app-admin-notification',
  imports: [FormsModule, CommonModule, Sidebar],
  templateUrl: './admin-notification.html',
  styleUrls: ['./admin-notification.css']
})
export class AdminNotifications implements OnInit {
  notifications: AppNotification[] = [];
  selectedNotification: AppNotification | null = null;
  showModal = false;
  isLoading = false;

  // Sidebar state
  sidebarOpen = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
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
      this.notificationService.update(this.selectedNotification._id, this.selectedNotification)
        .subscribe(() => {
          this.closeModal();
          this.loadNotifications();
        });
    } else {
      this.notificationService.create(this.selectedNotification)
        .subscribe(() => {
          this.closeModal();
          this.loadNotifications();
        });
    }
  }

  deleteNotification(id?: string) {
    if (!id) return;
    this.notificationService.delete(id).subscribe(() => {
      this.loadNotifications();
    });
  }

  closeModal() {
    this.showModal = false;
    this.selectedNotification = null;
  }
}
