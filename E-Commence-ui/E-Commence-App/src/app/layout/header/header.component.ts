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

  constructor(
    // private authService: AuthService,
    // private userDataService: UserDataService,
    private router: Router
  ) {
    // this.isLoggedIn = this.authService.checkIsLoggedIn();
    // this.authService.isloggedInValue.subscribe(value => {
    //   this.isLoggedIn = value;
    // });
    // this.userName = this.userDataService.userData?.userName||"";
    // this.userDataService.userDataValue.subscribe(value =>{
    //   this.userName = value?.userName||"";
    // });
  }

  ngOnInit() {
    this.fillMenu();
  }
  logout() {
    // this.authService.logout();
  }

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
        label: 'Nodes',
        routerLink: ['/nodes'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Services',
        routerLink: ['/services'],
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
