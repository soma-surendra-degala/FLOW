import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet],
  standalone: true,
  template: `<router-outlet></router-outlet>`
})
export class BlankLayout {}
