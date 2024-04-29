import { Routes } from '@angular/router';
import { AllJobListComponent } from './Components/all-job-list/all-job-list.component';
import { JobDetailsComponent } from './Components/job-details-display/job-details-display.component';
import { FavoriteJobsComponent } from './Components/job-favorite/jobs-favorite.component';

export const routes: Routes = [
    {path: "", component: AllJobListComponent},
    {path: "Jobs", component: AllJobListComponent},
    {path: "favoriteJob", component: FavoriteJobsComponent},
    {path: "jobDetails", component: JobDetailsComponent}
];
