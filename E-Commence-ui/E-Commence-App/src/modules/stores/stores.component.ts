import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from './interfaces/Store';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
})
export class StoresComponent implements OnInit {
  stores: Store[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    window.scroll(0, 0);
  }
  ngOnInit() {
    // this.productService.getProducts().then((data) => (this.products = data));
    this.activatedRoute.data.subscribe(
      (data) => {
        if (data && data['Stores']) {
          if (!data['Stores'].hasErrors) {
            this.stores = data['Stores'].data;
          }
        }
      },
      (error) => console.error('Error: ', error)
    );
  }
}
