import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../Admin-components/sidebar/sidebar';
import { Practice, PracticeService } from '../../shared/sharedservices/admin/practice';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-manage-practice',
  imports: [FormsModule, CommonModule, Sidebar, HttpClientModule],
  templateUrl: './manage-practice.html',
  styleUrls: ['./manage-practice.css']
})
export class ManagePractice implements OnInit {
  categories: string[] = [
    'Mathematics',
    'Algorithms',
    'C',
    'C++',
    'Java',
    'Python',
    'Data Structures',
    'JavaScript',
    'TypeScript',
    'Regex'
  ];

  isSidebarOpen = false;
  practices: Practice[] = [];
  showModal = false;
  selectedPractice: Practice | null = null;

  constructor(private practiceService: PracticeService) {}

  ngOnInit() {
    this.loadPractices();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Load all practices
  loadPractices() {
    this.practiceService.getPractices().subscribe({
      next: (data) => {
        this.practices = data.map(p => ({
          ...p,
          categories: p.categories || [],
          solution: p.solution || '' // ✅ Ensure solution field exists
        }));
      },
      error: (err) => console.error('Failed to load practices:', err)
    });
  }

  // Add new practice
  addPractice() {
    this.selectedPractice = {
      title: '',
      description: '',
      difficulty: 'Easy',
      categories: [],
      solution: '' // ✅ Include solution
    };
    this.showModal = true;
  }

  // Edit existing
  editPractice(practice: Practice) {
    this.selectedPractice = { ...practice }; // clone
    this.showModal = true;
  }

  // Delete
  deletePractice(id?: string) {
    if (!id) return;
    this.practiceService.deletePractice(id).subscribe({
      next: () => this.loadPractices(),
      error: (err) => console.error('Delete failed:', err)
    });
  }

  // Save (create/update)
  savePractice() {
    if (!this.selectedPractice) return;

    if (this.selectedPractice._id) {
      this.practiceService.updatePractice(this.selectedPractice._id, this.selectedPractice).subscribe({
        next: () => {
          this.loadPractices();
          this.closeModal();
        },
        error: (err) => console.error('Update failed:', err)
      });
    } else {
      this.practiceService.addPractice(this.selectedPractice).subscribe({
        next: () => {
          this.loadPractices();
          this.closeModal();
        },
        error: (err) => console.error('Add failed:', err)
      });
    }
  }

  // Close modal
  closeModal() {
    this.showModal = false;
    this.selectedPractice = null;
  }
}
