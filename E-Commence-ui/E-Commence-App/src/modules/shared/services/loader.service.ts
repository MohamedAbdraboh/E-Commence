import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private static requestsList: { id: number; destination: string; hadResponse: boolean }[] = [];

  constructor() { }

  public static showLoader() {
    let element = (document.getElementById('loading-bar-spinner-component') as HTMLElement);
    if (element && element.classList.contains('d-none')) {
      (document.getElementById('loading-bar-spinner-component') || {} as HTMLElement).classList.remove('d-none');
    }
  }

  public static hideLoader() {
    let element = (document.getElementById('loading-bar-spinner-component') as HTMLElement);
    if (element && !element.classList.contains('d-none')) {
      (document.getElementById('loading-bar-spinner-component') || {} as HTMLElement).classList.add('d-none');
    }
  }
}
