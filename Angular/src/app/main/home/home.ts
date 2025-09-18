import { Component } from '@angular/core';
import { Header } from '../components/header/header';
import { Hero } from '../components/hero/hero';
import { About } from '../about/about';
import { Contact } from '../contact/contact';
import { Interships } from '../interships/interships';
import { Ourservices } from '../ourservices/ourservices';
import { Footer } from '../components/footer/footer';
import { Testimonials } from '../testimonials/testimonials';

@Component({
  selector: 'app-home',
  imports: [Header,Hero,About,Contact,Ourservices,Interships,Testimonials,Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}


}
