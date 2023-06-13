import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { MenuItem } from 'primeng/api';
// import { AuthService } from 'src/modules/login/services/auth.service';
// import { UserDataService } from 'src/modules/login/services/user-data.service';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor() {}

  ngOnInit() {
    this.fillMenu();
  }
  logout() {}

  fillMenu() {
    this.items = [
      {
        label: 'Home',
        routerLink: ['/home'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Admin',
        routerLink: ['/admin/panal'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Stores',
        routerLink: ['/stores'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Products',
        routerLink: ['/products'],
        routerLinkActiveOptions: { exact: true },
      },
    ];
  }

  getProfileItems(): MenuItem[] {
    return [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: (event) => {
          this.logout();
        },
      },
    ];
  }
}
