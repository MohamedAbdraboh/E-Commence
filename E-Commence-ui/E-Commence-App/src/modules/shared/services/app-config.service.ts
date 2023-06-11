import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, interval } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private appConfig: any = null;
  constructor(private http: HttpClient) { }

  async LoadAppConfig(): Promise<any> {
    let data = await this.http.get('assets/Data/appConfig.json').toPromise();
    this.appConfig = data;
    return data;
  }

  getAppConfig(): any {
    if (!this.appConfig) {
      this.appConfig = this.LoadAppConfig();
    }
    else {
      return this.appConfig;
    }
  }

  getAppConfigForCommonService(): Observable<any> {
    return interval(50).pipe(
      map(() => this.appConfig),
      distinctUntilChanged()
    );
  }
}
