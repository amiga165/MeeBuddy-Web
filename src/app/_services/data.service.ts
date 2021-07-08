import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { CenterService } from "./center.service";
import { GuestService } from "./guest.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public userLocation: any;
  public userData: any;
  public wishlist: any;
  public cart: any;
  public center: any
  public token: any;
  public language: any ;
  public notifications: any;
  public userAddress: any;

  constructor(
	  private user: UserService,
	  private Center: CenterService

	) { 
	this.center = { };
	this.initVals();
	this.getFullData(); }

	ngOnInit(): void {
        this.center = { };
	this.initVals();
	this.getFullData();
  }

 initVals() {
	this.userData =  { info: {name: "", email:"", wallet: 0, order_count: 0, referrals_count: 0}, useWallet: false };
	this.wishlist =  new Set([]);
	this.cart = { total: 0, list: [], delivery: {minimum_order: 0, delivery_cost: 0, packing_charges: 0 , takeaway: false}}; console.log(this.cart);
	this.notifications = [];
	this.userAddress = [];
 }

 getFullData() {
	this.getLocationData();
	this.getLoginData();

 }
 
 getLocationData() {
 	this.Center.getCenterId();
	if (localStorage.getItem("Location")) { this.userLocation = JSON.parse(localStorage.getItem("Location"));
	// console.log("location from tok if", this.userLocation);
	
}
	else { this.userLocation = {} }
	this.Center.getCenter()
	.then(x => { 
		if (x) {
			this.center = x;
			console.log("location from tok", x);
			this.getCategories();
			console.log("xoxooxo",this.center);
		}  
	});
 }



  getLoginData() {
	this.user.getUser()
	.then(x => { 
		if (x) { 
			this.userData.info = x; 
			this.login();
			this.user.getWishlistIds().then(x => { this.storeFav(x) });
			this.user.getCartList().then(x => { this.initCart(x) });
			this.user.getNotifications().then(x => { this.notifications = x });
			this.user.savedAddress().then(x => { this.userAddress = x; });
		    // this.user.orderCharges().then(res => { this.cart.delivery = res; });

		} 
	});

  }


  calcCost(){
	this.cart.total = this.cart.list.reduce((acc, item) => acc+= item.count * item.product.quantities.filter(x => x._id === item.quantity)[0].product_cost, 0);
	console.log(this.cart.total);
  }


  initCart(items) {
	if (items) {
		this.cart.list = items;
		console.log("cartItems",items);
		this.calcCost()
	};
  }
  

  addToCart(Id) {
	console.log(this.cart.list);
	this.cart.list.push(Id);
	this.calcCost();
  }
  
  getCartItem(Id) {
	return this.cart.list.filter(x => x.quantity === Id);	
  } 


  removeCart(Id,flag = false) {
  	if (flag) {
  		this.cart.list = this.cart.list.filter(x => { return x.product.category != Id });
  	}
  	else {
		this.cart.list = this.cart.list.filter(x => { return x._id!=Id });	
  	}
	this.calcCost();
  }


  incrementCartItem(Id) {
	console.log(Id);
	console.log(this.cart.list.filter(x => x.quantity === Id));
	this.cart.list.filter(x => x.quantity === Id)[0].count += 1;
	this.calcCost();
  }

  decrementCartItem(Id) {
	console.log(Id);
	this.cart.list.filter(x => x.quantity === Id)[0].count -= 1;
	this.calcCost();
  }


  checkCart(Id) {
	let res;
	res = this.cart.list.filter(x => {
		console.log(x.product._id, Id);
		return x.product._id == Id;
	});
	if (res) { return true;}
	return false;
  }

  storeFav(list) {
	list.forEach(x => this.wishlist.add(x));
	console.log(this.wishlist);
  }

  addToWishlist(Id) {
	this.wishlist.add(Id);
  }

  checkWishlist(Id) {
	return this.wishlist.has(Id);
  }

  removeFav(Id) {
	this.wishlist.delete(Id);
  }

  setLocation(key,val) {
	this.userLocation[key] = val;
	this.save();
  }

  
  save() {
	localStorage.setItem("Location", JSON.stringify(this.userLocation));
  }

  reset() {
	console.log("restting");
	this.initVals();
  }

  signup(data) {
	this.userData.signup = data;
	this.userData.isSignedUp = true;
   }

  login() {
	this.userData.isSignedIn = true;
   } 

  setData(key,val) {
	this.userData[key] = val;
	console.log(this.userData);
  }

    getCategories() {

	this.center.categories =  {};

	this.Center.getCategories('shopping').then(x => {
	this.center.categories.shopping = x;
	});
	this.Center.getCategories('local-product').then(x => {
	this.center.categories.products = x;
	});
	this.Center.getCategories('service').then(x => {
	this.center.categories.service = x;
	});
  }

  getLocationService():Promise<any>{
	  return new Promise((resolve, reject) => {
		  navigator.geolocation.getCurrentPosition( resp => {
			  resolve({ lat: resp.coords.latitude , lon: resp.coords.longitude})
		  })
	  })
  }
  

}
