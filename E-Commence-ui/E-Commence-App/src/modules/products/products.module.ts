import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TableModule,
    ToolbarModule,
    FileUploadModule,
  ],
  declarations: [ProductsComponent, ProductCardComponent],
})
export class ProductsModule {}
