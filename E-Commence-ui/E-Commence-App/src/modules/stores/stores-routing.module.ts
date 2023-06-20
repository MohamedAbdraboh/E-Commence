import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresComponent } from './stores.component';
import { GetAllStoresResolver } from './resolvers/get-all-Store.resolver';
// import { GetProductResolver } from './resolvers/get-product.resolver';

const routes: Routes = [
  {
    path: 'stores',
    component: StoresComponent,
    resolve: { Stores: GetAllStoresResolver },
  },
  // {
  //   path: 'Stores/:id',
  //   component: ProductComponent,
  //   resolve: {Store: GetProductResolver}
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class StoresRoutingModule {}
