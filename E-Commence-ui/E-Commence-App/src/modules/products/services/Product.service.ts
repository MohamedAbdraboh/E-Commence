import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/modules/shared/services/app-config.service';
import { Product } from '../interfaces/Product';
import { Result } from 'src/modules/shared/interfaces/Result';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly BaseUrl: string;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.BaseUrl = this.appConfig.getAppConfig().ApiUrl + '/api/Products';
  }

  getProducts(): Observable<Result<Product[]>> {
    //https://localhost:7233/api/Products
    return this.http.get<Result<Product[]>>(`${this.BaseUrl}`);
  }

  getProduct(productId: string): Observable<Result<Product>> {
    return this.http.get<Result<Product>>(`${this.BaseUrl}/${productId}`);
  }

  postProduct(product: Product): Observable<Result<Product>> {
    let model = { product: product };
    return this.http.post<Result<Product>>(`${this.BaseUrl}`, model);
  }

  updateProduct(
    productId: string,
    product: Product
  ): Observable<Result<Product>> {
    let model = { product: product };
    return this.http.put<Result<Product>>(
      `${this.BaseUrl}/${productId}`,
      model
    );
  }

  deleteProduct(productId: string): Observable<Result<boolean>> {
    return this.http.delete<Result<boolean>>(`${this.BaseUrl}/${productId}`);
  }
}
