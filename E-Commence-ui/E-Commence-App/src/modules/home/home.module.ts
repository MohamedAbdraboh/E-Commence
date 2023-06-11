import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StatusComponent } from './components/status/status.component';
import { SharedModule } from '../shared/shared.module';
import { ClusterModule } from '../cluster/cluster.module';
import { AllHealthIssuesComponent } from './components/all-health-issues/all-health-issues.component';
import { HealthIssuesByEntityComponent } from './components/all-health-issues/health-issues-by-entity/health-issues-by-entity.component';
import { HealthIssuesByHealthTestComponent } from './components/all-health-issues/health-issues-by-health-test/health-issues-by-health-test.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HomeRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    StatusComponent,
    AllHealthIssuesComponent,
    HealthIssuesByEntityComponent,
    HealthIssuesByHealthTestComponent
  ]
})
export class HomeModule { }
