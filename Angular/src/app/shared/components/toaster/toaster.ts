import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Toast, ToasterService } from '../../sharedservices/toaster';


@Component({
  selector: 'app-toaster',
  imports: [CommonModule],
  templateUrl: './toaster.html',
  styleUrls: ['./toaster.css']
})
export class Toaster implements OnInit {
  toast: Toast | null = null;
  timeoutId: any;

  constructor(private toaster: ToasterService) {}

  ngOnInit() {
    this.toaster.toast$.subscribe(toast => {
      if (toast) {
        this.toast = toast;

        // Clear previous timer
        if (this.timeoutId) clearTimeout(this.timeoutId);

        // Auto-hide after duration
        this.timeoutId = setTimeout(() => {
          this.toast = null;
        }, toast.duration ?? 3000);
      }
    });
  }
}
