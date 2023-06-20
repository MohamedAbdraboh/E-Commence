import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/modules/shared/services/app-config.service';
import { Result } from 'src/modules/shared/interfaces/Result';
import { Store } from '../interfaces/Store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly BaseUrl: string;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.BaseUrl = this.appConfig.getAppConfig().ApiUrl + '/api/Stores';
  }

  getStores(): Observable<Result<Store[]>> {
    return this.http.get<Result<Store[]>>(`${this.BaseUrl}`);
  }

  getStore(storeId: string): Observable<Result<Store>> {
    return this.http.get<Result<Store>>(`${this.BaseUrl}/${storeId}`);
  }

  postStore(Store: Store): Observable<Result<Store>> {
    let model = { Store: Store };
    return this.http.post<Result<Store>>(`${this.BaseUrl}`, model);
  }

  updateStore(storeId: string, Store: Store): Observable<Result<Store>> {
    let model = { Store: Store };
    return this.http.put<Result<Store>>(`${this.BaseUrl}/${storeId}`, model);
  }

  deleteStore(storeId: string): Observable<Result<boolean>> {
    return this.http.delete<Result<boolean>>(`${this.BaseUrl}/${storeId}`);
  }
}
