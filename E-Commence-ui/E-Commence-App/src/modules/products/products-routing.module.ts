import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { GetAllProductsResolver } from './resolvers/get-all-product.resolver';
// import { GetProductResolver } from './resolvers/get-product.resolver';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    resolve: { Products: GetAllProductsResolver },
  },
  // {
  //   path: 'products/:id',
  //   component: ProductComponent,
  //   resolve: {Cluster: GetProductResolver}
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
