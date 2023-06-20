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
  productDialog: boolean = false;
  store!: Store;
  selectedStores!: Store[] | null;
  submitted: boolean = false;
  statuses!: any[];
  tab: number = 1;

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
    console.log('this.stores', this.stores);
  }

  openNew() {
    this.store = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.stores = this.stores.filter(
          (val) => !this.selectedStores?.includes(val)
        );
        this.selectedStores = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(store: Store) {
    this.store = { ...store };
    this.productDialog = true;
  }

  deleteProduct(store: Store) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + store.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.stores = this.stores.filter((val) => val.id !== store.id);
        this.store = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.store.name?.trim()) {
      if (this.store.id) {
        this.stores[this.findIndexById(this.store.id)] = this.store;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.store.id = this.createId();
        // this.store.img = 'product-placeholder.svg';
        this.stores.push(this.store);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.stores = [...this.stores];
      this.productDialog = false;
      this.store = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.stores.length; i++) {
      if (this.stores[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warning';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //   }
  // }
}
