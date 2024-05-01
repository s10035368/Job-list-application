
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JobService } from '../../job.services';
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
export class DetailedJobComponent implements OnInit {
  constructor(private jobservice: JobService, private router: Router, private location: Location) { }
  http = inject(HttpClient)
  jobDetails!: JobDetailsData;

   /*
    Method is called when it gets the ID of chosen job and calls retrieveDetails method for details of
    the selected job.
  */

  ngOnInit(): void {
    const ListId = this.jobservice.ChosenJob.id;
    this.retrieveJobDetails(ListId);
  }

  /*
    Method makes http get request for details of chose job using the ID. Subscribes to observable returned
    by httpclient.get and jobDetails gets the data
  */

  retrieveJobDetails(id: number) {
    const address = `${'/jobs'}/${id}`;
    this.http.get<JobDetailsData>(address).subscribe((data => {
      this.jobDetails = data;
    }))
  }

    /*
    Method is for navigating back to listed job page.
    */

  goBack() {
    this.location.back()
  }

}
