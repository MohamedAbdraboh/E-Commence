/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeaderInterceptorService } from './HeaderInterceptor.service';

describe('Service: HeaderInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderInterceptorService]
    });
  });

  it('should ...', inject([HeaderInterceptorService], (service: HeaderInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
