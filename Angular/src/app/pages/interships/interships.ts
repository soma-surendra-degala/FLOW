import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interships',
  imports: [CommonModule],
  templateUrl: './interships.html',
  styleUrls: ['./interships.css']
})
export class Interships {

  internships = [
    {
      icon: 'bi bi-laptop',
      color: 'text-blue-400',
      title: 'Web Development',
      description: 'Build modern, responsive websites and applications using the latest technologies.',
      skills: [
        '✅ Frontend & Backend Training',
        '✅ API Integration',
        '✅ Deployment Skills'
      ],
      buttonColor: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: 'bi bi-bar-chart-line',
      color: 'text-purple-400',
      title: 'Data Analysis',
      description: 'Work with data sets, analyze trends, and create insightful reports & dashboards.',
      skills: [
        '✅ Data Cleaning & Visualization',
        '✅ Excel, Python, & SQL',
        '✅ Predictive Modelling'
      ],
      buttonColor: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: 'bi bi-brush',
      color: 'text-green-400',
      title: 'UI/UX Design',
      description: 'Design engaging user experiences with a focus on aesthetics and usability.',
      skills: [
        '✅ Wireframing & Prototyping',
        '✅ Figma, Adobe XD',
        '✅ User Testing'
      ],
      buttonColor: 'bg-green-500 hover:bg-green-600'
    }
  ];

  constructor(private router:Router){}

  login(){
    this.router.navigate(['student/login'])
  }

}
