
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
  favoriteJobList: JobData[] = [];


  constructor(private jobservice: JobService,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage['favoriteJob']) {
      this.favoriteJobList = JSON.parse(localStorage.getItem('favoriteJob') || '{}');
    }
  }
   
  jobDetail(selectedJob: JobData) {
    this.jobservice.SelectedJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }
}
