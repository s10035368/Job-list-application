
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../common.services';
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
  templateUrl: './jobs-favorite.component.html',
  styleUrl: './jobs-favorite.component.css'
})
export class FavoriteJobsComponent  implements OnInit {
  noFavJob: string = 'No favorite job is selected here! ';
  isFavorite: boolean = false;
  favoriteJobList: JobData[] = [];


  constructor(private commonservice: CommonService,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage['favoriteJob']) {
      this.favoriteJobList = JSON.parse(localStorage.getItem('favoriteJob') || '{}');
    }
  }
   
  jobDetail(selectedJob: JobData) {
    this.commonservice.SelectedJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }
}
