import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptorService } from './services/HeaderInterceptor.service';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeTableModule } from 'primeng/treetable';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TreeModule } from 'primeng/tree';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { AvatarModule } from 'primeng/avatar';
// import {AvatarGroupModule} from 'primeng/avatargroup';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';

const guards: any[] = [];

const services: any[] = [];

const pipes: any[] = [];

const modules = [
  RouterModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  TabViewModule,
  CardModule,
  AccordionModule,
  SplitButtonModule,
  // FontAwesomeModule,
  TableModule,
  SliderModule,
  DropdownModule,
  MultiSelectModule,
  ProgressBarModule,
  TreeTableModule,
  TieredMenuModule,
  SidebarModule,
  MenuModule,
  DialogModule,
  ToastModule,
  ConfirmDialogModule,
  InputTextModule,
  TreeModule,
  AvatarModule,
  SelectButtonModule,
  CheckboxModule,
  ToolbarModule,
  DividerModule,
  PasswordModule,
];

const components: any[] = [];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...components, ...pipes],
  declarations: [...components, ...pipes],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true, // Add this line when using multiple interceptors.
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true, // Add this line when using multiple interceptors.
    },
    ConfirmationService,
    MessageService,
  ],
  entryComponents: [],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [...pipes, ...guards, ...services],
    };
  }
}
