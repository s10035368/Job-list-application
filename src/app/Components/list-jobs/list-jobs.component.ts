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
        let favoriteJobList: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}');
        this.jobCatalog.forEach(a => {
          favoriteJobList.forEach((y, i) => {
            if (a.id === y.id) {
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
    if (localStorage['favoriteJob'] && item[0].isSelectedFavorite == false) {
      let savedArray: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}')
      savedArray.forEach((i, index) => {
        if (i.id == item[0].id) {
          savedArray.splice(index, 1);
        }
      });
      localStorage.setItem('favoriteJob', JSON.stringify(savedArray));
    } else {
      this.jobservice.chosenJobArr = []
      this.JobChoice(job);
    }

  }

  JobChoice(job: JobInfo) {
    if (this.jobservice.chosenJobArr.length == 0) {
      this.jobservice.chosenJobArr.push(job);
      this.jobservice.matchingArr = this.jobservice.chosenJobArr;
      this.jobservice.favJob = this.jobservice.chosenJobArr;
      let cachedArr: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}')
      if (cachedArr.length > 0) {
        let idMap = new Map<number, JobInfo>(cachedArr.map(obj => [obj.id, obj]));
        for (let obj of this.jobservice.favJob) {
          if (!idMap.has(obj.id)) {
            cachedArr.push(obj);
            idMap.set(obj.id, obj);
          }
          localStorage.setItem('favoriteJob', JSON.stringify(cachedArr))
        }
      } else {
        localStorage.setItem('favoriteJob', JSON.stringify(this.jobservice.favJob))
      }
    }
    else {
      for (let i = 0; i < this.jobservice.chosenJobArr.length; i++) {
        if (this.jobservice.chosenJobArr.find(x => x.id == job.id) == undefined) {
          this.jobservice.matchingArr.push(job);
          break;
        }
        else {
          this.jobservice.matchingArr.forEach((item, index) => {
            if (item.id == job.id) {
              this.jobservice.matchingArr.splice(index, 1);
            }
          });
          break;
        }
      }
      this.jobservice.chosenJobArr = this.jobservice.matchingArr;
      this.jobservice.favJob = this.jobservice.chosenJobArr;
      let cachedArr: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}')
      if (cachedArr.length > 0) {
        let idMap = new Map<number, JobInfo>(cachedArr.map(obj => [obj.id, obj]));
        for (let obj of this.jobservice.favJob) {
          if (!idMap.has(obj.id)) {
            cachedArr.push(obj);
            idMap.set(obj.id, obj);
          }
          localStorage.setItem('favoriteJob', JSON.stringify(cachedArr))
        }
      } else {
        localStorage.setItem('favoriteJob', JSON.stringify(this.jobservice.favJob))
      }
    }
  }

  jobDetail(selectedJob: JobInfo) {
    this.jobservice.ChosenJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }
}