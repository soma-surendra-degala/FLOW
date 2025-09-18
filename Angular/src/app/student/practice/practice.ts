import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';
import { PracticeService } from '../../shared/sharedservices/practice';
import { Practice } from '../../shared/components/models/practice.model';
import { ToasterService } from '../../shared/sharedservices/toaster';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Header],
  templateUrl: './practice.html',
  styleUrls: ['./practice.css'],
})
export class Practices implements OnInit {
  categories: string[] = [
    'C', 'Mathematics', 'Algorithms', 'C++', 'Java',
    'Python', 'Data Structures', 'JavaScript', 'TypeScript', 'Regex'
  ];
  selectedCategories: string[] = [];
  practiceList: Practice[] = [];
  userSolutions: { [key: string]: string } = {};
  loading = false;
  error: string | null = null;

  showModal = false;
  modalMode: 'solve' | 'solution' = 'solve';
  activePractice: Practice | null = null;
  showSolution = false;

  constructor(private practiceService: PracticeService, private toaster: ToasterService) {}

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

  clearCategories() {
    this.selectedCategories = [];
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

  toggleSolution() {
    this.showSolution = !this.showSolution;
  }

  closeModal() {
    this.showModal = false;
    this.activePractice = null;
    this.showSolution = false;
  }

  submitSolution() {
    if (!this.activePractice) return;
    const practiceId = this.activePractice._id!;
    const solution = this.userSolutions[practiceId] || '';
    const userId = '';

    if (!solution.trim()) {
       this.toaster.show('⚠️ Please enter a solution', 'warning'); 
      return;
    }

    const payload = { userId, solutionText: solution };

    this.practiceService.submitSolution(practiceId, payload).subscribe({
      next: (res) => {
        this.toaster.show('✅ Solution submitted successfully!', 'success');
        this.closeModal();
      },
      error: () => this.toaster.show('❌ Failed to submit solution.', 'error')
    });
  }

  runCode() {
    if (!this.activePractice) return;

    const code = this.userSolutions[this.activePractice._id || ''] || '';
    if (!code.trim()) {
      this.toaster.show('⚠️ Please write some code first!', 'warning');
      return;
    }
    console.log('Running code:', code);
    this.toaster.show('✅ Code executed successfully! (placeholder)', 'success');
  }
}
