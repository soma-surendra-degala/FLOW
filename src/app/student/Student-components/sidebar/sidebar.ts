import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,   // 👈 make it standalone
  imports: [CommonModule],  // 👈 ngClass, ngIf, ngFor live here
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {  isOpen = true;
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
      this.isOpen = false; // start closed on mobile
    } else {
      this.isOpen = true; // start open on desktop
    }
  }

    constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([`/student/${path}`]);
  }
}