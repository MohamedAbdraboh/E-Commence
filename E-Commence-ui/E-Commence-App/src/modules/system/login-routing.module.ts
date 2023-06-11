import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path : 'notfound',
    component: NotFoundPageComponent
  },
  {
    path : 'unauthorized',
    component: UnauthorizedComponent
  },  
  {
    path : 'error',
    component: ErrorComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
