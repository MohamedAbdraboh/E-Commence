import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Result } from 'src/modules/shared/interfaces/Result';
import { Store } from '../interfaces/Store';
import { StoreService } from '../services/Store.service';

@Injectable({ providedIn: 'root' })
export class GetAllStoresResolver implements Resolve<Result<Store[]>> {
  constructor(private storeService: StoreService) {}

  resolve(): Observable<Result<Store[]>> {
    return this.storeService.getStores().pipe(
      catchError((error) => {
        // TODO: Remove `console.log` and use logger service
        console.log('problem fetching Store data, error: ', error);
        return of({});
      })
    );
  }
}
