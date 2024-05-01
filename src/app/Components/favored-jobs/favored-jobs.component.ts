
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../job.services';
import { HttpClient } from '@angular/common/http';

export interface JobData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFavorite: boolean
}

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favored-jobs.component.html',
  styleUrl: './favored-jobs.component.css'
})
export class FavoriteJobsComponent  implements OnInit {
  noFavJob: string = 'No favorite job is chosen here! ';
  isFav: boolean = false;
  listofFavJobs: JobData[] = [];


  constructor(private jobservice: JobService, private router: Router) { }

  /*
    initializes listofFavJobs property by have the data retrieved from local storage if it exists.
  */

  ngOnInit(): void {
    if (localStorage['favoriteJob']) {
      this.listofFavJobs = JSON.parse(localStorage.getItem('favoriteJob') || '{}');
    }
  }

  /*
    this JobDetail method is needed to show the details when job is clicked
  */
   
  jobDetail(selectedJob: JobData) {
    this.jobservice.ChosenJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }
}
