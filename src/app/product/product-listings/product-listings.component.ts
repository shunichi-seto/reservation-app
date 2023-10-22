import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';


@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListingsComponent {
  products: any

  constructor(private productService: ProductService) {}

  ngOnInit() {
    const productObservable = this.productService.getProducts()
    productObservable.subscribe(
      (data) => {
        console.log('got value ' + data)
        this.products = data
      },
      (err) => {console.error('something wrong occurred: ' + err)},
      () => {console.log('done')}
    )
  }

}
