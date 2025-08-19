import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';
import { Practice, PracticeService } from '../../shared/sharedservices/practice';


@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Header],
  templateUrl: './practice.html',
  styleUrls: ['./practice.css'],
})
export class Practices implements OnInit {  
  practiceList: Practice[] = [];
  loading = true;
  error: string | null = null;

  // UI state for modal
  showModal = false;
  modalMode: 'solve' | 'solution' = 'solve';
  activePractice: Practice | null = null;
  tempAnswer = '';

  constructor(private practiceService: PracticeService) {}

  ngOnInit() {
    this.loadPractices();
  }

  loadPractices() {
    this.practiceService.getPractices().subscribe({
      next: (data) => {
        this.practiceList = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load practices:', err);
        this.error = 'Could not load practices. Try again later.';
        this.loading = false;
      }
    });
  }

  // BUTTON HANDLERS
  onSolve(item: Practice) {
    this.activePractice = item;
    this.modalMode = 'solve';
    this.tempAnswer = (item as any).userAnswer || '';
    this.showModal = true;
  }

  onViewSolution(item: Practice) {
    this.activePractice = item;
    this.modalMode = 'solution';
    this.showModal = true;
  }

  submitSolution() {
    if (!this.activePractice) return;
    if (!this.tempAnswer.trim()) {
      alert('Please enter your solution first.');
      return;
    }
    (this.activePractice as any).userAnswer = this.tempAnswer.trim();
    (this.activePractice as any).status = 'Completed';
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.activePractice = null;
    this.tempAnswer = '';
  }
}
