/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HealthIssuesByEntityComponent } from './health-issues-by-entity.component';

describe('HealthIssuesByEntityComponent', () => {
  let component: HealthIssuesByEntityComponent;
  let fixture: ComponentFixture<HealthIssuesByEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthIssuesByEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthIssuesByEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
