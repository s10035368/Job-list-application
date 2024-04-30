import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface JobData {
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
  favJob: JobData[] = [];
  DuplicateJobList: JobData[] = [];
  selectedJobArray: JobData[] = [];
  duplicateArray : JobData[] = [];
  SelectedJob!: JobData;
  
  
  
  constructor(private http: HttpClient) { }

collectData() {
  const address = '/jobs';
  return this.http.get<[]>(address);
}
}