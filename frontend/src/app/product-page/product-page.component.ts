import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import {CustomerService} from '../customer.service';
import { Customer } from '../customer';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.css"],
})
export class ProductPageComponent implements OnInit {
  product: Product;
  // {
  //   productName:"sdf",
  //   productBrand:"asdfasdf",
  //   productPrice:123,
  //   productRating:213,
  //   discount:12,
  //   featured:true,
  //   noOfProductViewed:21,
  //   noOfProducts:21,
  //   productActivated:true,
  //   productCategory:"asdf",
  //   productId:123123123,
  //   productImage:"asdfqweqwe",
  //   productInfo:1312312312432534543,
  //   status:true

  // };
  constructor(
    private _customerService: CustomerService,
    private formbuilder: FormBuilder
  ) {}
  customer: Customer;
  location: String;

  ngOnInit() {
    this.product = this._customerService.getProduct();
    this.location = this.product.productImage;
    console.log("location is:" + this.location);
    console.log("Product receieved is:" + this.product);
    this._customerService.getCustomerById().subscribe((customer) => {
      this.customer = customer;
      console.log(this.customer);
    });
  }

  sendToCart(quantity) {
    let productJson = {
      productId: this.product.productId,
      productName: this.product.productName,
      productImage: this.product.productImage,
      productPrice: this.product.productPrice,
      productRating: this.product.productRating,
      noOfProductViewed: this.product.noOfProductViewed,
      productBrand: this.product.productBrand,
      noOfProducts: this.product.noOfProducts,
      productInfo: this.product.productInfo,
      discount: this.product.discount,
      productCategory: this.product.productCategory,
      productActivated: this.product.productActivated,
      status: this.product.status,
      featured: this.product.featured,
    };
    let customerJson = {
      userId: this.customer.userId,
      name: this.customer.name,
      username: this.customer.username,
      password: this.customer.password,
      eMail: this.customer.eMail,
      role: this.customer.role,
      securityQuestion: this.customer.securityQuestion,
      securityAnswer: this.customer.securityAnswer,
      phoneNumber: this.customer.phoneNumber,
      alternatePhoneNumber: this.customer.alternatePhoneNumber,
      alternateEmail: this.customer.alternateEmail,
      address: this.customer.address,
      active: this.customer.active,
      customerCarts: this.customer.customerCarts,
    };

    //send to cart service function
    this._customerService
      .addToCart(quantity, customerJson, productJson)
      .subscribe((customer) => {
        console.log(customer);
      });
  }

  sendToWishL(quantity) {
    let productJson = {
      productId: this.product.productId,
      productName: this.product.productName,
      productImage: this.product.productImage,
      productPrice: this.product.productPrice,
      productRating: this.product.productRating,
      noOfProductViewed: this.product.noOfProductViewed,
      productBrand: this.product.productBrand,
      noOfProducts: this.product.noOfProducts,
      productInfo: this.product.productInfo,
      discount: this.product.discount,
      productCategory: this.product.productCategory,
      productActivated: this.product.productActivated,
      status: this.product.status,
      featured: this.product.featured,
    };
    let customerJson = {
      userId: this.customer.userId,
      name: this.customer.name,
      username: this.customer.username,
      password: this.customer.password,
      eMail: this.customer.eMail,
      role: this.customer.role,
      securityQuestion: this.customer.securityQuestion,
      securityAnswer: this.customer.securityAnswer,
      phoneNumber: this.customer.phoneNumber,
      alternatePhoneNumber: this.customer.alternatePhoneNumber,
      alternateEmail: this.customer.alternateEmail,
      address: this.customer.address,
      active: this.customer.active,
      customerCarts: this.customer.customerCarts,
    };

    //send to cart service function
    this._customerService
      .sendToWishL(quantity, customerJson, productJson)
      .subscribe((customer) => {
        console.log(customer);
      });
  }

  quantityForm = this.formbuilder.group({
    quantity: [1, [Validators.required,Validators.pattern("[1-9]")]]
  });

  btnWishlist() {
    console.log(this.quantityForm.get("quantity").value);
    this.sendToWishL(this.quantityForm.get("quantity").value);
  }

  btnCart() {
    this.sendToCart(this.quantityForm.get("quantity").value);
  }

  btnFeedback() {}
}
