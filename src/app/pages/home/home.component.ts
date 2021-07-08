import { Component, OnInit } from '@angular/core';
import { UserService } from "../../_services/user.service";
import { CommonService } from "../../_services/common.service";
import { CenterService } from "../../_services/center.service";
import { DataService } from "../../_services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  centerData: any = { working_status : true } ;
  items: any[] = [{},{},{}];
  data: any[] = [];
  shopping: any = [];

  constructor( private common: CommonService, private center: CenterService, public dataService: DataService ) {

	}

  ngOnInit(): void {

  }


  getCategories() {

	let shoppingData = this.dataService.center?.categories?.shopping;
	if (shoppingData) {
	        shoppingData.forEach(res => {
	                        if (res.items_count) {
	                                res.link = "shop"
	                        }
	                        else { res.link = "shopping" }
	                });
	}
	this.items[0] = { title: "Online Store",route: "/shopping", list: shoppingData?.slice(0,5) }

	let serviceData = this.dataService.center?.categories?.service;
	if (serviceData) { serviceData.forEach(res => { res.link = "/services"}); }
	this.items[1] = { title: "Services",route: "/services", list: serviceData?.slice(0,5) }


	let productData = this.dataService.center?.categories?.products;
	if (productData) { productData.forEach(res => { res.link = "/local-product"}); } 
	this.items[2] = { title: "Local Products",route: "/local-product", list: productData?.slice(0,5) }

	console.log("datttaaa", this.dataService.center, this.items);
	return this.items;
  }

}

