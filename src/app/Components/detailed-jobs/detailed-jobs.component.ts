
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JobService } from '../../common.services';
import { Location } from '@angular/common';



export interface JobDetailsData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  location: string,
  industries: string,
  types: string,
  description: string,
  publishDate: string
}

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'detailed-jobs.component.html',
  styleUrl: 'detailed-jobs.component.css'
})
export class JobDetailsComponent implements OnInit {
  constructor(private jobservice: JobService,
    private router: Router,
    private location: Location) { }
  http = inject(HttpClient)
  jobDetails!: JobDetailsData;

  ngOnInit(): void {
    const ListId = this.jobservice.SelectedJob.id;
    this.featchJobDetails(ListId);
  }

  featchJobDetails(id: number) {
    const url = `${'/jobs'}/${id}`;
    this.http.get<JobDetailsData>(url).subscribe((data => {
      this.jobDetails = data;
    }))
  }

  goBack() {
    this.location.back()
  }

}
