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
    if (this.jobservice.chosenJobArr.length != 0) {
      this.jobCatalog = this.jobservice.ListIdenticalJobs;
    } 
    else {
      this.retrieveJobList();
    }
  }

  /*
    This method retrieves a list of jobs from jobservice that's stored in JobCatalog and checking if those
    jobs are marked as favorites depending on data in the localStorage.
  */
  retrieveJobList() {
    this.jobservice.collectData().subscribe(info => {
      this.jobCatalog = info;
        this.jobservice.ListIdenticalJobs = this.jobCatalog;
  
          
        const localStorageFav: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '[]');
          if (localStorageFav.length > 0) {
              this.jobCatalog.forEach(job => {
                  localStorageFav.forEach(favoriteJob => {
                      if (job.id == favoriteJob.id) {
                          job.isSelectedFavorite = favoriteJob.isSelectedFavorite;
                      }
                  });
              });
          }
      });
  }
  
  /*
    This method toggles with isSelectedFavorite property of a job and handles the updates in local storage
    favorites.
  */
  PreferChoice(job: JobInfo) {
    const jobItem = this.jobCatalog.find(a => a.id === job.id);
    
    if (!jobItem) return; // Ensure the item exists in the catalog

    jobItem.isSelectedFavorite = !jobItem.isSelectedFavorite;

    if (localStorage['favoriteJob'] && !jobItem.isSelectedFavorite) {
        let cachedArr: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '[]');
        const list = cachedArr.findIndex(i => i.id == jobItem.id);
        if (list!== -1) {
            cachedArr.splice(list, 1);
            localStorage.setItem('favoriteJob', JSON.stringify(cachedArr));
        }
    } else {
        this.jobservice.chosenJobArr = [];
        this.JobChoice(job);
    }
}
  /*
    This methods handles the selecting or deselecting of a job and manages the arrays in the jobservice.
  */

  JobChoice(job: JobInfo) {
    if (this.jobservice.chosenJobArr.length == 0) {
      this.jobservice.chosenJobArr.push(job);
      this.jobservice.matchingArr = this.jobservice.chosenJobArr;
      this.jobservice.favJob = this.jobservice.chosenJobArr;
    } else {
      const currentList = this.jobservice.chosenJobArr.findIndex(x => x.id === job.id);
      if (currentList == -1) {
        this.jobservice.matchingArr.push(job);
      } else {
        this.jobservice.matchingArr.splice(currentList, 1);
      }
      this.jobservice.chosenJobArr = this.jobservice.matchingArr;
      this.jobservice.favJob = this.jobservice.chosenJobArr;
    }
  
    const cachedArr: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '[]');
    const idToJobMap = new Map<number, JobInfo>(cachedArr.map(obj => [obj.id, obj]));
    for (const favoriteJob of this.jobservice.favJob) {
      if (!idToJobMap.has(favoriteJob.id)) {
        cachedArr.push(favoriteJob);
        idToJobMap.set(favoriteJob.id, favoriteJob);
      }
    }
    localStorage.setItem('favoriteJob', JSON.stringify(cachedArr));
  }
  

  jobDetail(selectedJob: JobInfo) {
    this.jobservice.ChosenJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }
}



