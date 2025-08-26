import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,   // 👈 make it standalone
  imports: [CommonModule,FormsModule],  // 👈 ngClass, ngIf, ngFor live here
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {  
  isOpen = true;
  isMobile = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isOpen = false; // Closed by default on mobile
    } else {
      this.isOpen = true; // Open by default on desktop
    }
  }


    constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([`/student/${path}`]);
  }


}