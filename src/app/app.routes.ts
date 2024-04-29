import { Routes } from '@angular/router';
import { AllJobListComponent } from './Components/list-jobs/list-jobs.component';
import { JobDetailsComponent } from './Components/detailed-jobs/detailed-jobs.component';
import { FavoriteJobsComponent } from './Components/favored-jobs/favored-jobs.component';

export const routes: Routes = [
    {path: "", component: AllJobListComponent},
    {path: "Jobs", component: AllJobListComponent},
    {path: "favoriteJob", component: FavoriteJobsComponent},
    {path: "jobDetails", component: JobDetailsComponent}
];
