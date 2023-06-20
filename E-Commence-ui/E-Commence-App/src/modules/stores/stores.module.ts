import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresComponent } from './stores.component';
import { StoreCardComponent } from './components/store-card/store-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StoresComponent, StoreCardComponent],
})
export class StoresModule {}
