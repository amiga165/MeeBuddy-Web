import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
import { UserService } from "../../_services/user.service";
import { DataService } from "../../_services/data.service";
import { GuestService } from "../../_services/guest.service";
import { AlertService } from "../../_services/alert.service"


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  category = new EventEmitter();
  cartItems: any = [];
  empty : boolean = false;
  amount: number = 0;
  total : number = 0;
  selectedAddress: string;
  loading = true;
  takeAway: number = 0;
  separateData: any = [];

  constructor(private user: UserService,
   public dataService: DataService,
   public guest: GuestService,
   public alert: AlertService) {

  }

  navitems: any[] = ["Cart","Address","Delivery"];
  step : number = 1;

  ngOnInit(): void {

	this.user.getCartList().then(res => { 
		this.loading = false; 
		this.dataService.cart.list = res;
		this.user.getCartCats().then(x => { this.separateData = x; this.filterCategories();});
		});
		

  }

  refresh(e){
	this.user.getCartList().then(res => { 
		this.loading = false; 
		this.dataService.cart.list = res;
		this.user.getCartCats().then(x => { this.separateData = x ; this.filterCategories();});
		});
  }


	filterCategories(){
		// console.log(this.separateData);
		if (this.dataService.userData.isSignedIn){
			this.separateData.forEach(x => {
				let catData = this.dataService.cart.list.filter(item => {return item.product.category === x._id});

				x.items = catData;	
			});
		}
		else {

			this.separateData = [{name: "Products", "items": this.guest.guestCart.items }];
		}

		return this.separateData;
	}




 getQuantity(Quantities,id) { let res = Quantities.filter(x => x._id === id);  return res; }

 setAddress(addr) { this.selectedAddress = addr;}

 inc(value, cat){ 
 	this.dataService.cart.total = this.subTotal(cat._id);
 	if (this.dataService.cart.total < cat.minimum_order){ 
 		this.alert.error("Minimum order is "+ cat.minimum_order)
 		return
 	}
 	if (value) {
 		this.takeAway = value;
 		this.dataService.cart.delivery.takeaway = true;
 		console.log("Take Away Man!!!");
 	}
 	else {
 		this.dataService.cart.delivery.takeaway = false;
 	}
	if (this.step<3){
		this.step += 1;
	}
 }

 dec(){ 
	if (this.step >1){

	this.step -= 1;
	// this.takeAway = 0;
	}
 }

 set(val) {this.step = val;}

 clearCart(catId) {
 	this.user.deleteCartCats({"category_id":catId}).then(x => {
 		console.log(x);
 		this.separateData = this.separateData.filter(x => {return catId !== x._id});
 		this.dataService.removeCart(catId,true);
 	});
 	
	// this.user.clearCartItems().then(x => { if (x) { this.dataService.cart.list = []; this.dataService.cart.total = 0; } });
 }


 deleteItem(item){ 
	console.log("prod",item);
	
	   if (this.dataService.userData.isSignedIn) {
		this.user.removeCartItem(item._id).then(x => { if (x) { this.dataService.removeCart(item._id) } });
		this.refresh("");
	}

	else { this.guest.removeCart(item.product.quantities[0]._id); console.log(item._id); }
  } 


  subTotal(cat_id){
  	this.cartItems = this.dataService.userData.isSignedIn ? this.dataService.cart.list : this.guest.guestCart.items;

  	var total = 0;
  	for (var item of this.cartItems.filter(item => this.dataService.userData.isSignedIn ? item.product.category === cat_id : true)){
  		var qnt = item.product.quantities[0];
 		var price = qnt.product_cost;	
		var count = this.cartItems.filter(x => x.quantity === qnt._id)[0].count;
		total += price * count;  		
  	}
	  this.category = cat_id;
	  this.amount = total;

  	return total;
  }
}
