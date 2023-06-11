import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticListsHelperService {

  static HealthIssueType = [
    { key: 'Free Space', value: 1 },
    { key: 'Agent Status', value: 2 },
    { key: 'Connectivity', value: 3 },
    { key: 'Agent Parcel Directory', value: 4 },
    { key: 'Process Status', value: 5 },
];
  
constructor() { }

static getItemKey(list: { key: string; value: any }[], value: any): string {
  if (list && value) {
    let item = list.filter((c) => c.value === value)[0];

    if (item) {
      return item.key ?? '';
    }
  }
  return '';
}
static getItemValue(list: { key: string; value: any }[], key: string): any {
  if (list && key) {
    let item = list.filter((c) => c.key === key)[0];

    if (item) {
      return item.value ?? -1;
    }
  }
  return -1;
}

}
