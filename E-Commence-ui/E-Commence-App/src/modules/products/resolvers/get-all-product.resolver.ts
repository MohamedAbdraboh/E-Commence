import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Result } from 'src/modules/shared/interfaces/Result';
import { ProductService } from '../services/Product.service';
import { Product } from '../interfaces/Product';

@Injectable({ providedIn: 'root' })
export class GetAllProductsResolver implements Resolve<Result<Product[]>> {
  constructor(private productService: ProductService) {}

  resolve(): Observable<Result<Product[]>> {
    return this.productService.getProducts().pipe(
      catchError((error) => {
        // TODO: Remove `console.log` and use logger service
        console.log('problem fetching Products data, error: ', error);
        return of({});
      })
    );
  }
}
