import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface JobInfo {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFavorite: boolean
} 

@Injectable({
  providedIn: 'root'
})

export class JobService {
  favJob: JobInfo[] = [];
  DuplicateJobList: JobInfo[] = [];
  selectedJobArray: JobInfo[] = [];
  duplicateArray : JobInfo[] = [];
  SelectedJob!: JobInfo;
  
  
  
  constructor(private http: HttpClient) { }

collectData() {
  const address = '/jobs';
  return this.http.get<[]>(address);
}
}