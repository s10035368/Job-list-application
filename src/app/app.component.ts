import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AllJobListComponent} from './Components/all-job-list/all-job-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    AllJobListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) { }

  setTab(name: string) {
    this.router.navigate([`/${name}`]);
  }
}
