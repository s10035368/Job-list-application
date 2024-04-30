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
export class AllJobListComponent implements OnInit {
  http = inject(HttpClient)
  jobCatalog: JobInfo[] = [];
  isSelected: boolean = false;

  constructor(private jobservice: JobService, private router: Router) { }

  ngOnInit(): void {
    if (this.jobservice.selectedJobArray.length != 0) {
      this.jobCatalog = this.jobservice.DuplicateJobList;
    } else {
      this.retrieveJobList();
    }
  }

  retrieveJobList() {
    this.jobservice.collectData().subscribe(data => {
      this.jobCatalog = data;
      this.jobservice.DuplicateJobList = this.jobCatalog;

      if (localStorage['favoriteJob']) {
        let favoriteJobList: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}');
        this.jobCatalog.forEach(x => {
          favoriteJobList.forEach((y, i) => {
            if (x.id === y.id) {
              x.isSelectedFavorite = y.isSelectedFavorite
            }
          })
        });
      }
    })
  }

  PreferChoice(job: JobInfo) {
    const item = this.jobCatalog.filter(x => x.id === job.id);
    if (item[0].isSelectedFavorite) {
      item[0].isSelectedFavorite = false;
    } else {
      item[0].isSelectedFavorite = true;
    }
    if (localStorage['favoriteJob'] && item[0].isSelectedFavorite == false) {
      let savedArray: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}')
      savedArray.forEach((i, index) => {
        if (i.id === item[0].id) {
          savedArray.splice(index, 1);
        }
      });
      localStorage.setItem('favoriteJob', JSON.stringify(savedArray));
    } else {
      this.jobservice.selectedJobArray = []
      this.onJobSelect(job);
    }

  }

  onJobSelect(job: JobInfo) {
    if (this.jobservice.selectedJobArray.length === 0) {
      this.jobservice.selectedJobArray.push(job);
      this.jobservice.duplicateArray = this.jobservice.selectedJobArray;
      this.jobservice.favJob = this.jobservice.selectedJobArray;
      let savedArray: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}')
      if (savedArray.length > 0) {
        let idMap = new Map<number, JobInfo>(savedArray.map(obj => [obj.id, obj]));
        for (let obj of this.jobservice.favJob) {
          if (!idMap.has(obj.id)) {
            savedArray.push(obj);
            idMap.set(obj.id, obj);
          }
          localStorage.setItem('favoriteJob', JSON.stringify(savedArray))
        }
      } else {
        localStorage.setItem('favoriteJob', JSON.stringify(this.jobservice.favJob))
      }
    }
    else {
      for (let i = 0; i < this.jobservice.selectedJobArray.length; i++) {
        if (this.jobservice.selectedJobArray.find(x => x.id === job.id) === undefined) {
          this.jobservice.duplicateArray.push(job);
          break;
        }
        else {
          this.jobservice.duplicateArray.forEach((item, index) => {
            if (item.id === job.id) {
              this.jobservice.duplicateArray.splice(index, 1);
            }
          });
          break;
        }
      }
      this.jobservice.selectedJobArray = this.jobservice.duplicateArray;
      this.jobservice.favJob = this.jobservice.selectedJobArray;
      let savedArray: JobInfo[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}')
      if (savedArray.length > 0) {
        let idMap = new Map<number, JobInfo>(savedArray.map(obj => [obj.id, obj]));
        for (let obj of this.jobservice.favJob) {
          if (!idMap.has(obj.id)) {
            savedArray.push(obj);
            idMap.set(obj.id, obj);
          }
          localStorage.setItem('favoriteJob', JSON.stringify(savedArray))
        }
      } else {
        localStorage.setItem('favoriteJob', JSON.stringify(this.jobservice.favJob))
      }
    }
  }

  jobDetail(selectedJob: JobInfo) {
    this.jobservice.SelectedJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }
}