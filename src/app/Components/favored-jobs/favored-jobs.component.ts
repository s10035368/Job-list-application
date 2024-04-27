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
  noBestJob: string | undefined;
  isFavorite: boolean = false;

  constructor(private jobservice: JobService, private router: Router) { }
    favoriteJobList: JobData[] = [];

  ngOnInit(): void {
    if (this.jobservice.favoriteJob.length !== 0) {
      this.isFavorite = true;
      this.favoriteJobList = this.jobservice.favoriteJob;
    } else {
      this.isFavorite = false;
      this.noBestJob = 'No favorite job is chosen! '
    }
  }

  jobDetail(selectedJob: JobData) {
    this.jobservice.SelectedJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }
}
