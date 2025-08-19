// src/app/student/practice/practice.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';

type Status = 'Pending' | 'Completed';

interface PracticeItem {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  timeLeft: string;
  status: Status;
  solution?: string;       // for Completed items
  userAnswer?: string;     // student’s answer after Solve
}

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Header],
  templateUrl: './practice.html',
  styleUrls: ['./practice.css'],
})
export class Practice {
  practiceList: PracticeItem[] = [
    {
      id: 1,
      title: 'Array Reversal',
      description: 'Reverse an array without using built-ins.',
      dueDate: '2025-08-25',
      timeLeft: '2 days left',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'Palindrome Checker',
      description: 'Check if a string is a palindrome.',
      dueDate: '2025-08-26',
      timeLeft: '3 days left',
      status: 'Completed',
      solution:
`function isPal(s){ s=s.toLowerCase().replace(/[^a-z0-9]/g,''); 
  return s===s.split('').reverse().join(''); }`
    },
    {
      id: 3,
      title: 'Prime Numbers',
      description: 'Generate all primes up to 100.',
      dueDate: '2025-08-22',
      timeLeft: 'Today',
      status: 'Pending'
    }
  ];

  // UI state for modal
  showModal = false;
  modalMode: 'solve' | 'solution' = 'solve';
  activePractice: PracticeItem | null = null;
  tempAnswer = '';

  // Filter-nav click (optional; wire up later to real routes if you want)
  navigate(path: string) {
    console.log('navigate:', path);
  }

  // BUTTON HANDLERS
  onSolve(item: PracticeItem) {
    this.activePractice = item;
    this.modalMode = 'solve';
    this.tempAnswer = item.userAnswer || '';
    this.showModal = true;
  }

  onViewSolution(item: PracticeItem) {
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
    this.activePractice.userAnswer = this.tempAnswer.trim();
    this.activePractice.status = 'Completed';
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.activePractice = null;
    this.tempAnswer = '';
  }
}
