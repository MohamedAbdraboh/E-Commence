import { Injectable, TemplateRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastSeverity } from '../enums/ToastSeverity.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private messageService: MessageService) { }

  show(severity: ToastSeverity, title: string, message: string, isSticky: boolean) {
    this.messageService.add({ severity: severity, summary: title, detail: message, sticky: isSticky });
  }

  showTopLeft(severity: ToastSeverity, title: string, message: string, isSticky: boolean) {
    this.messageService.add({ key: 'tl', severity: severity, summary: title, detail: message, sticky: isSticky });
  }

  showTopCenter(severity: ToastSeverity, title: string, message: string, isSticky: boolean) {
    this.messageService.add({ key: 'tc', severity: severity, summary: title, detail: message, sticky: isSticky });
  }

  showBottomCenter(severity: ToastSeverity, title: string, message: string, isSticky: boolean) {
    this.messageService.add({ key: 'bc', severity: severity, summary: title, detail: message, sticky: isSticky });
  }

  showConfirm(severity: ToastSeverity, title: string, message: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: severity, summary: title, detail: message });
  }

  showMultiple(messages: { severity: ToastSeverity, summary: string, detail: string }[]) {
    this.messageService.addAll(messages);
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}