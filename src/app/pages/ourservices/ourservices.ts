import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ourservices',
  imports: [CommonModule],
  templateUrl: './ourservices.html',
  styleUrl: './ourservices.css'
})
export class Ourservices {
  badges = [
    { text: '⚡ Fast Delivery', color: 'bg-blue-500/20 text-blue-300' },
    { text: '🎯 Expert Team', color: 'bg-purple-500/20 text-purple-300' },
    { text: '🔒 Secure', color: 'bg-green-500/20 text-green-300' },
    { text: '💡 Innovative', color: 'bg-yellow-500/20 text-yellow-300' }
  ];

  services = [
    {
      icon: 'bi bi-code-slash',
      color: 'text-blue-400',
      title: 'Custom Web Development',
      description: 'Tailored websites and web applications built with cutting-edge technologies.',
      features: [
        '✅ Responsive Design',
        '✅ SEO Optimized',
        '✅ API Integrations'
      ]
    },
    {
      icon: 'bi bi-phone',
      color: 'text-purple-400',
      title: 'Mobile App Development',
      description: 'Build high-performance mobile apps for Android and iOS platforms.',
      features: [
        '✅ Cross-Platform',
        '✅ User-Friendly UI',
        '✅ Smooth Performance'
      ]
    },
    {
      icon: 'bi bi-palette',
      color: 'text-green-400',
      title: 'UI/UX Design',
      description: 'Design user-friendly, visually appealing interfaces that convert visitors.',
      features: [
        '✅ Modern Aesthetics',
        '✅ Interactive Prototypes',
        '✅ User Testing'
      ]
    }
  ];

}
