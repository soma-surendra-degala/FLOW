import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../admin-components/sidebar/sidebar';

interface Exercise {
  id: number;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

@Component({
  selector: 'app-manage-practice',
  imports: [FormsModule , CommonModule,Sidebar],
  templateUrl: './manage-practice.html',
  styleUrls: ['./manage-practice.css']
})
export class ManagePractice {
  
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  exercises: Exercise[] = [
    {
      id: 1,
      title: 'Array Basics',
      description: 'Solve simple array problems',
      icon: 'bi bi-list-ul',
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Binary Search',
      description: 'Implement binary search algorithm',
      icon: 'bi bi-search',
      difficulty: 'Medium'
    }
  ];

  showModal = false;
  selectedExercise: Exercise | null = null;

  // Add new exercise
  addExercise() {
    this.selectedExercise = {
      id: 0,
      title: '',
      description: '',
      icon: '',
      difficulty: 'Easy'
    };
    this.showModal = true;
  }

  // Edit exercise
  editExercise(exercise: Exercise) {
    this.selectedExercise = { ...exercise }; // clone to avoid direct binding
    this.showModal = true;
  }

  // Delete exercise
  deleteExercise(id: number) {
    this.exercises = this.exercises.filter(ex => ex.id !== id);
  }

  // Save exercise (add or update)
  saveExercise() {
    if (!this.selectedExercise) return;

    if (this.selectedExercise.id === 0) {
      // Add new with unique id
      this.selectedExercise.id =
        this.exercises.length > 0
          ? Math.max(...this.exercises.map(e => e.id)) + 1
          : 1;
      this.exercises.push({ ...this.selectedExercise });
    } else {
      // Update existing
      const index = this.exercises.findIndex(
        ex => ex.id === this.selectedExercise!.id
      );
      if (index !== -1) {
        this.exercises[index] = { ...this.selectedExercise };
      }
    }

    this.closeModal();
  }

  // Close modal
  closeModal() {
    this.showModal = false;
    this.selectedExercise = null;
  }
}
