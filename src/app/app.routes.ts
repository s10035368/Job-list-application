import { Routes } from '@angular/router';
import { ListedJobComponent } from './Components/list-jobs/list-jobs.component';
import { DetailedJobComponent } from './Components/detailed-jobs/detailed-jobs.component';
import { FavoriteJobsComponent } from './Components/favored-jobs/favored-jobs.component';

export const routes: Routes = [
    {path: "", component: ListedJobComponent},
    {path: "Jobs", component: ListedJobComponent},
    {path: "favoriteJob", component: FavoriteJobsComponent},
    {path: "jobDetails", component: DetailedJobComponent}
];
