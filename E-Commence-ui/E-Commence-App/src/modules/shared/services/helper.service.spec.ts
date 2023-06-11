/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StaticListsHelperService } from './static-lists-helper.service';

describe('Service: Helper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticListsHelperService]
    });
  });

  it('should ...', inject([StaticListsHelperService], (service: StaticListsHelperService) => {
    expect(service).toBeTruthy();
  }));
});
