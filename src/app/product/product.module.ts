import { NgModule } from '@angular/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListingsComponent } from './product-listings/product-listings.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'products', component: ProductComponent,
    children: [
      { path: '', component: ProductListingsComponent },
      { path: ':productId', component: ProductDetailsComponent }
    ]
   }
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    ProductListingsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class ProductModule { }
