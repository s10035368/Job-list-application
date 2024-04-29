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
  selectedJobArray: JobData[] = [];
  duplicateArray : JobData[] = [];
  SelectedJob!: JobData;
  favoriteJob: JobData[] = [];
  DuplicateJobList: JobData[] = [];
  
  
  constructor(private http: HttpClient) { }

fetchData() {
  const url = '/jobs';
  return this.http.get<[]>(url);
}
}