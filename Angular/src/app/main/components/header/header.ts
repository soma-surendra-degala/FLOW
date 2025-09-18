import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  constructor(private router: Router) {}

  scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
isMobileMenuOpen = false;

ngOnInit() {
  const menuButton = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      menu.classList.toggle('hidden', !this.isMobileMenuOpen);
    });
  }
}

mobileNavigate(sectionId: string) {
  this.scrollToSection(sectionId);
  // Close the menu
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.add('hidden');
    this.isMobileMenuOpen = false;
  }
}

login() {
  window.open('/student/login', '_blank');
}

admin() {
  window.open('/admin/login', '_blank');
}


}
