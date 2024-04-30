import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ListedJobComponent} from './Components/list-jobs/list-jobs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ListedJobComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) { }

  mainTab(identity: string) {
    this.router.navigate([`/${identity}`]);
  }
}
