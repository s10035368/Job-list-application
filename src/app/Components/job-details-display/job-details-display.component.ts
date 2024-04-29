
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../../common.services';
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
  templateUrl: 'job-details-display.component.html',
  styleUrl: 'job-details-display.component.css'
})
export class JobDetailsComponent implements OnInit {
  constructor(private commonservice: CommonService,
    private router: Router,
    private location: Location) { }
  http = inject(HttpClient)
  jobDetails!: JobDetailsData;

  goBack() {
    this.location.back()
  }

  ngOnInit(): void {
    const ListId = this.commonservice.SelectedJob.id;
    this.featchJobDetails(ListId);
  }

  featchJobDetails(id: number) {
    const url = `${'/jobs'}/${id}`;
    this.http.get<JobDetailsData>(url).subscribe((data => {
      this.jobDetails = data;
    }))
  }

}
