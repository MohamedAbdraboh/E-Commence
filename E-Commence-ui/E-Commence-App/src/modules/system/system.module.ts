import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ErrorComponent } from './error/error.component';
import { SystemRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule
  ],
  declarations: [
    NotFoundPageComponent,
    UnauthorizedComponent,
    ErrorComponent]
})
export class SystemModule { }
