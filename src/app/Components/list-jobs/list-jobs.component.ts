import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { JobInfo, JobService } from '../../job.services';
import { Router } from '@angular/router';


export interface JobData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFavorite: boolean
}

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'list-jobs.component.html',
  styleUrl: 'list-jobs.component.css'
})
export class ListedJobComponent implements OnInit {
  http = inject(HttpClient)
  jobCatalog: JobInfo[] = [];
  isPreferred: boolean = false;

  constructor(private jobservice: JobService, private router: Router) { }

  ngOnInit(): void {
    if (this.jobservice.chosenJobArr.length != 0) 
    {
      this.jobCatalog = this.jobservice.ListIdenticalJobs;
    } 
    else 
    {
      this.retrieveJobList();
    }
  }

  retrieveJobList() {
    this.jobservice.collectData().subscribe(info => {
      this.jobCatalog = info;
      this.jobservice.ListIdenticalJobs = this.jobCatalog;

      if (localStorage['favoriteJob']) {
        let jobFavlist: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}');
        this.jobCatalog.forEach(a => {
          jobFavlist.forEach((y, i) => {
            if (a.id == y.id) {
              a.isSelectedFavorite = y.isSelectedFavorite
            }
          })
        });
      }
    })
  }

  PreferChoice(job: JobInfo) {
    const item = this.jobCatalog.filter(a=> a.id == job.id);
    if (item[0].isSelectedFavorite) 
    {
      item[0].isSelectedFavorite = false;
    }
     else 
     {
      item[0].isSelectedFavorite = true;
    }
    if (localStorage['favoriteJob'] && item[0].isSelectedFavorite == false) 
      {
      let cachedArr: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}')
      cachedArr.forEach((i, index) => {
        if (i.id == item[0].id) 
        {
          cachedArr.splice(index, 1);
        }
      });
      localStorage.setItem('favoriteJob', JSON.stringify(cachedArr));
    } else {
      this.jobservice.chosenJobArr = []
      this.JobChoice(job);
    }

  }

  JobChoice(job: JobInfo) {
    if (this.jobservice.chosenJobArr.length === 0) {
      this.jobservice.chosenJobArr.push(job);
      this.jobservice.matchingArr = this.jobservice.chosenJobArr;
      this.jobservice.favJob = this.jobservice.chosenJobArr;
    } else {
      const existingIndex = this.jobservice.chosenJobArr.findIndex(x => x.id === job.id);
      if (existingIndex === -1) {
        this.jobservice.matchingArr.push(job);
      } else {
        this.jobservice.matchingArr.splice(existingIndex, 1);
      }
      this.jobservice.chosenJobArr = this.jobservice.matchingArr;
      this.jobservice.favJob = this.jobservice.chosenJobArr;
    }
  
    const cachedArr: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '[]');
    const idMap = new Map<number, JobInfo>(cachedArr.map(obj => [obj.id, obj]));
    for (const obj of this.jobservice.favJob) {
      if (!idMap.has(obj.id)) {
        cachedArr.push(obj);
        idMap.set(obj.id, obj);
      }
    }
    localStorage.setItem('favoriteJob', JSON.stringify(cachedArr));
  }
  

  jobDetail(selectedJob: JobInfo) {
    this.jobservice.ChosenJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }
}