import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { JobService } from '../../job.services';
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
  jobList: JobData[] = [];
  isSelected: boolean = false;

  constructor(private jobservice: JobService, private router: Router) { }

  ngOnInit(): void {
    if (this.jobservice.selectedJobArray.length != 0) {
      this.jobList = this.jobservice.DuplicateJobList;
    } else {
      this.fetchJobList();
    }
  }

  fetchJobList() {
    this.jobservice.collectData().subscribe(data => {
      this.jobList = data;
      this.jobservice.DuplicateJobList = this.jobList;

      if (localStorage['favoriteJob']) {
        let favoriteJobList: JobData[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}');
        this.jobList.forEach(x => {
          favoriteJobList.forEach((y, i) => {
            if (x.id === y.id) {
              x.isSelectedFavorite = y.isSelectedFavorite
            }
          })
        });
      }
    })
  }

  OptiSelect(job: JobData) {
    const item = this.jobList.filter(x => x.id === job.id);
    if (item[0].isSelectedFavorite) {
      item[0].isSelectedFavorite = false;
    } else {
      item[0].isSelectedFavorite = true;
    }
    if (localStorage['favoriteJob'] && item[0].isSelectedFavorite == false) {
      let savedArray: JobData[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}')
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

  onJobSelect(job: JobData) {
    if (this.jobservice.selectedJobArray.length === 0) {
      this.jobservice.selectedJobArray.push(job);
      this.jobservice.duplicateArray = this.jobservice.selectedJobArray;
      this.jobservice.favJob = this.jobservice.selectedJobArray;
      let savedArray: JobData[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}')
      if (savedArray.length > 0) {
        let idMap = new Map<number, JobData>(savedArray.map(obj => [obj.id, obj]));
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
      let savedArray: JobData[] = JSON.parse(localStorage.getItem('favoriteJob') || '{}')
      if (savedArray.length > 0) {
        let idMap = new Map<number, JobData>(savedArray.map(obj => [obj.id, obj]));
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

  jobDetail(selectedJob: JobData) {
    this.jobservice.SelectedJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }
}