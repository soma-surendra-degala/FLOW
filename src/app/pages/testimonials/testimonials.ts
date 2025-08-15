import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials {


  testimonials = [
    {
      name: 'Sravani Reddy',
      initials: 'SR',
      review: 'The course material was incredibly clear and the hands-on projects made learning easy. I highly recommend this platform!'
    },
    {
      name: 'Karthik Rao',
      initials: 'KR',
      review: 'I finally understood complex topics thanks to the brilliant instructors. The support team was also very responsive to my questions.'
    },
    {
      name: 'Ramesh Naidu',
      initials: 'RN',
      review: 'This is the best learning management system I have ever used. The interface is intuitive, and the content is top-notch.'
    },
    {
      name: 'Divya Varma',
      initials: 'DV',
      review: 'The interactive quizzes and progress tracking kept me motivated. I learned so much in a short amount of time.'
    },
    {
      name: 'Arjun Kumar',
      initials: 'AK',
      review: 'Flexible schedules and diverse course options allowed me to learn at my own pace. A fantastic resource for lifelong learners.'
    }
  ];
}
