import { Component } from '@angular/core';
import { Header } from '../Student-components/header/header';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pratice-skills',
  imports: [Header,Sidebar,CommonModule],
  templateUrl: './practice-skills.html',
  styleUrl: './practice-skills.css'
})
export class PracticeSkills {
skillList = [
  { name: 'Mathematics', icon: 'bi-calculator' },
  { name: 'Algorithms', icon: 'bi-diagram-3' },
  { name: 'C', icon: 'bi-filetype-c' },
  { name: 'C++', icon: 'bi-filetype-cpp' },
  { name: 'Java', icon: 'bi-cup-hot' },
  { name: 'Python', icon: 'bi-filetype-py' },
  { name: 'Data Structures', icon: 'bi-diagram-2' },
  { name: 'JavaScript', icon: 'bi-filetype-js' },
  { name: 'TypeScript', icon: 'bi-filetype-tsx' },
  { name: 'Regex', icon: 'bi-braces' }
];

constructor(private router: Router) {}

goToPractice() {
  this.router.navigate(['/student/practice']);

}


}
