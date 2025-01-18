import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Product} from "../product-model/product-model";
import {ProductsComponent} from "../products/products.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductsComponent, RouterLink],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @Input() viewType: 'gridView' | 'tableView' = 'gridView';
  productsList!:Product[];

  mockProductList: Product[] = [
    {
      name: "Ocean",
      category: "Furniture",
      status: "Active",
      sales: 11,
      stock: 36,
      price: 560,
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      name: "Lou",
      category: "Kitchen",
      status: "Disabled",
      sales: 6,
      stock: 46,
      price: 710,
      imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8a2l0Y2hlbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Yellow",
      category: "Decoration",
      status: "Active",
      sales: 61,
      stock: 56,
      price: 360,
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Dreamy",
      category: "Bedroom",
      status: "Disabled",
      sales: 41,
      stock: 66,
      price: 260,
      imageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmVkcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Boheme",
      category: "Furniture",
      status: "Active",
      sales: 32,
      stock: 40,
      price: 350,
      imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Sky",
      category: "Bathroom",
      status: "Disabled",
      sales: 22,
      stock: 44,
      price: 160,
      imageUrl: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGludGVyaW9yfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Midnight",
      category: "Furniture",
      status: "Active",
      sales: 23,
      stock: 45,
      price: 340,
      imageUrl: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGludGVyaW9yfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Palm",
      category: "Decoration",
      status: "Active",
      sales: 24,
      stock: 46,
      price: 60,
      imageUrl: "https://images.unsplash.com/photo-1511389026070-a14ae610a1be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGludGVyaW9yfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Forest",
      category: "Living Room",
      status: "Active",
      sales: 41,
      stock: 16,
      price: 270,
      imageUrl: "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGludGVyaW9yfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Sand",
      category: "Living Room",
      status: "Disabled",
      sales: 52,
      stock: 16,
      price: 230,
      imageUrl: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njd8fGludGVyaW9yfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Autumn",
      category: "Decoration",
      status: "Active",
      sales: 21,
      stock: 46,
      price: 252,
      imageUrl: "https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODd8fGludGVyaW9yfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
    },
  ];

  constructor() {

  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsList = this.mockProductList;
    console.log(this.productsList);
  }
}

