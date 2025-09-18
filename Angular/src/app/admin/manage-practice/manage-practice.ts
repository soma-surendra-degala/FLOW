import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Practice, PracticeService } from '../../shared/sharedservices/practice';
import { HttpClientModule } from '@angular/common/http';
import { Sidebar } from '../components/sidebar/sidebar';

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
  isLoading = true; // ✅ Loader flag

  constructor(private practiceService: PracticeService) {}

  ngOnInit() {
    this.loadPractices();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Load all practices
  loadPractices() {
    this.isLoading = true; // ✅ start loader
    this.practiceService.getPractices().subscribe({
      next: (data) => {
        this.practices = data.map(p => ({
          ...p,
          categories: p.categories || [],
          solution: p.solution || '' // ✅ Ensure solution field exists
        }));
        this.isLoading = false; // ✅ stop loader
      },
      error: (err) => {
        console.error('Failed to load practices:', err);
        this.isLoading = false; // ✅ stop loader even if error
      }
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
    this.isLoading = true; // ✅ show loader during delete
    this.practiceService.deletePractice(id).subscribe({
      next: () => {
        this.loadPractices();
      },
      error: (err) => {
        console.error('Delete failed:', err);
        this.isLoading = false;
      }
    });
  }

  // Save (create/update)
  savePractice() {
    if (!this.selectedPractice) return;
    this.isLoading = true; // ✅ show loader during save

    if (this.selectedPractice._id) {
      this.practiceService.updatePractice(this.selectedPractice._id, this.selectedPractice).subscribe({
        next: () => {
          this.loadPractices();
          this.closeModal();
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.practiceService.addPractice(this.selectedPractice).subscribe({
        next: () => {
          this.loadPractices();
          this.closeModal();
        },
        error: (err) => {
          console.error('Add failed:', err);
          this.isLoading = false;
        }
      });
    }
  }

  // Close modal
  closeModal() {
    this.showModal = false;
    this.selectedPractice = null;
  }
}
