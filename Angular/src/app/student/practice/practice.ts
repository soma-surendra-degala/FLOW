import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';
import { PracticeService } from '../../shared/sharedservices/admin/practice';
import { Practice } from '../../shared/models/practice.model';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Header],
  templateUrl: './practice.html',
  styleUrls: ['./practice.css'],
})
export class Practices implements OnInit {
  categories: string[] = [
    'Mathematics', 'Algorithms', 'C', 'C++', 'Java',
    'Python', 'Data Structures', 'JavaScript', 'TypeScript', 'Regex'
  ];
  clearCategories() {
  this.selectedCategories = [];
}


  selectedCategories: string[] = [];
  practiceList: Practice[] = [];

  userSolutions: { [key: string]: string } = {}; // ✅ Track user solutions by practice ID
  loading = false;
  error: string | null = null;

  showModal = false;
  modalMode: 'solve' | 'solution' = 'solve';
  activePractice: Practice | null = null;
  showSolution = false;

  constructor(private practiceService: PracticeService) {}

  ngOnInit(): void {
    this.loadPractices();
  }

  toggleCategory(cat: string) {
    if (this.selectedCategories.includes(cat)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== cat);
    } else {
      this.selectedCategories.push(cat);
    }
    this.loadPractices();
  }

  loadPractices() {
    this.loading = true;
    this.error = null;

    this.practiceService.getPractices(this.selectedCategories).subscribe({
      next: (data) => {
        this.practiceList = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load practices';
        this.loading = false;
      }
    });
  }

  onSolve(practice: Practice) {
    this.activePractice = practice;
    this.modalMode = 'solve';
    this.showSolution = false;
    this.showModal = true;

    const id = practice._id!;
    if (!this.userSolutions[id]) {
      this.userSolutions[id] = '';
    }
  }

  onViewSolution(practice: Practice) {
    this.activePractice = practice;
    this.modalMode = 'solution';
    this.showSolution = true;
    this.showModal = true;

    const id = practice._id!;
    if (!this.userSolutions[id]) {
      this.userSolutions[id] = '';
    }
  }
            

  closeModal() {
    this.showModal = false;
    this.activePractice = null;
    this.showSolution = false;
  }

  toggleSolution() {
    this.showSolution = !this.showSolution;
  }
submitSolution() {
  if (!this.activePractice) return;

  const practiceId = this.activePractice._id!;
  const solution = this.userSolutions[practiceId] || '';
  const userId = '64f9e2c7d9b1a3b123456789'; // Replace with actual logged-in user ID

  if (!solution.trim()) {
    alert('Please enter a solution');
    return;
  }

  const payload = {
    userId: userId,
    solutionText: solution
  };

  this.practiceService.submitSolution(practiceId, payload).subscribe({
    next: (res) => {
      console.log('Solution submitted:', res);
      alert('Solution submitted successfully!');
      this.closeModal();
    },
    error: (err) => {
      console.error('Submit failed:', err);
      alert('Failed to submit solution.');
    }
  });
}
}
