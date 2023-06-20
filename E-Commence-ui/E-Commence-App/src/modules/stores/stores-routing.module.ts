import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresComponent } from './stores.component';
// import { GetProductResolver } from './resolvers/get-product.resolver';

const routes: Routes = [
  {
    path: 'Stores',
    component: StoresComponent,
    // resolve: { Products: GetAllProductsResolver },
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
export class StoresRoutingModule {}
