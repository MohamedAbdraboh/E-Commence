/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HealthIssuesByHealthTestComponent } from './health-issues-by-health-test.component';

describe('HealthIssuesByHealthTestComponent', () => {
  let component: HealthIssuesByHealthTestComponent;
  let fixture: ComponentFixture<HealthIssuesByHealthTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthIssuesByHealthTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthIssuesByHealthTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
