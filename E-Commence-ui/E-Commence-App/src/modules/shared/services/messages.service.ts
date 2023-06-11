import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: any;

  constructor(private http: HttpClient) { }

LoadMessages() {
  return this.http.get('assets/Data/messages.json')
  .subscribe({
    next: data => this.messages = data,
    error: err => console.log(err?.error?.msg ? err.error.msg : err.statusText),
  });
  }

  getMessages() {
    return this.messages;
  }

  getMessageWithKeys(group:string, section:string, title:string):string{
    return this.messages[group][section][title]||"";
  }
}
