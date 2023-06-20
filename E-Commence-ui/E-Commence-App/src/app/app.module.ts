import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfigService } from 'src/modules/shared/services/app-config.service';
import { MessagesService } from 'src/modules/shared/services/messages.service';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SharedModule } from 'src/modules/shared/shared.module';
import { MenubarModule } from 'primeng/menubar';
import { HomeModule } from 'src/modules/home/home.module';
import { ProductsModule } from 'src/modules/products/products.module';
import { StoresModule } from 'src/modules/stores/stores.module';
import { BranchesModule } from 'src/modules/Branches/Branches.module';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.LoadAppConfig();
  };
};
const messagesInitializerFn = (messages: MessagesService) => {
  return () => {
    return messages.LoadMessages();
  };
};

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    HomeModule,
    StoresModule,
    BranchesModule,
    ProductsModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService],
    },
    MessagesService,
    {
      provide: APP_INITIALIZER,
      useFactory: messagesInitializerFn,
      multi: true,
      deps: [MessagesService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
