import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetAllClustersResolver } from '../cluster/resolvers/get-all-clusters.resolver';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {AllClusters: GetAllClustersResolver}
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
