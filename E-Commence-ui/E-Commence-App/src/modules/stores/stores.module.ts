import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresComponent } from './stores.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { StoresRoutingModule } from './stores-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [StoresRoutingModule, CommonModule, SharedModule],
  declarations: [StoresComponent, StoreCardComponent],
})
export class StoresModule {}
