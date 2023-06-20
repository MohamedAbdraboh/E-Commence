import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Result } from 'src/modules/shared/interfaces/Result';
import { ProductService } from '../services/Product.service';
import { Product } from '../interfaces/Product';

@Injectable({ providedIn: 'root' })
export class GetProductResolver implements Resolve<Result<Product>> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Result<Product>> {
    let productId: string = route.params['id'];
    return this.productService.getProduct(productId).pipe(
      catchError((error) => {
        // TODO: Remove `console.log` and use logger service
        console.log('problem fetching Product data, error: ', error);
        return of({});
      })
    );
  }
}
