import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Result } from 'src/modules/shared/interfaces/Result';
import { Store } from '../interfaces/Store';
import { StoreService } from '../services/Store.service';

@Injectable({ providedIn: 'root' })
export class GetProductResolver implements Resolve<Result<Store>> {
  constructor(private storeService: StoreService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Result<Store>> {
    let productId: string = route.params['id'];
    return this.storeService.getStore(productId).pipe(
      catchError((error) => {
        // TODO: Remove `console.log` and use logger service
        console.log('problem fetching Product data, error: ', error);
        return of({});
      })
    );
  }
}
