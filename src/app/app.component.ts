import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AllJobListComponent} from './Components/list-jobs/list-jobs.component';

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

  mainTab(name: string) {
    this.router.navigate([`/${name}`]);
  }
}
