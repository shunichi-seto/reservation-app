import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  product: any

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // this.product = this.productService.getProductById(params.get('productId')!)
      const productObservable = this.productService.getProductById(params.get('productId')!)
      productObservable.subscribe(
        (data) => {
          this.product = data
        },
        (err) => {

        }
      )
    })
  }
}
