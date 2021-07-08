import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertService } from "../../_services/alert.service";
import { Router } from '@angular/router';
import { DataService } from "../../_services/data.service";
import { UserService } from "../../_services/user.service"; 
import { CenterService } from "../../_services/center.service";
import swal from 'sweetalert';

declare var Razorpay: any;

@Component({
  selector: 'app-paymethod',
  templateUrl: './paymethod.component.html',
  styleUrls: ['./paymethod.component.scss']
})

export class PaymethodComponent implements OnInit {

  @Output() value = new EventEmitter();
  @Input() stage: number ;
 
  @Input() shippingAddr: string ;
  @Input() takeaway: boolean;
  @Input() category: string;
  public deliveryTimings: any = [];
  public cost: number ;
  public amount: number;
  public delivery_cost = 0;
  public packing_charges = 0;
  public summary = 0;
  public accepted_payments = new Set(["wallet", "cod", "razorpay"]);
  public order: any;
  public wallet: any = 0;
  public orderData: any = { wallet: 0, takeaway: 0, category_id:'', packing:0 ,location: { lat: 0, lon: 0}, chosen_delivery_time: 0, note: ""};
  public pickup_address;

  constructor( 
	private toastr: AlertService, 
	private router: Router, 
	private user: UserService , 
	public dataService: DataService,
	private center: CenterService
	) {	
		// this.getLocation(); 	
		this.center.orderTimes().then(x => {this.deliveryTimings = x; console.log(x); } );
		
			

	}

  ngOnInit(): void {

	this.cost = this.dataService.cart.total;

	// if(this.dataService.cart.delivery.takeaway)
	// 	this.cost = this.dataService.cart.total

	this.amount = this.cost;

	this.wallet = this.dataService.userData.info.wallet;
	
	
	this.getOrderCharges();

	this.dataService.userData.useWallet = false
		
  }



  getOrderCharges(){
	 	let  data = {
			category_id: this.category,
			address_id: this.shippingAddr,
		}
		
		this.user.orderCharges(data).then( res => {


			if (res){
				this.dataService.cart.delivery.packing_charges = res.packing_charges.charge;
				console.log(res.packing_charges.charge);
				this.dataService.cart.delivery.delivery_cost = res.delivery_cost;
				this.delivery_cost = res.delivery_cost;
				if (this.dataService.cart.delivery.takeaway) { this.delivery_cost = 0; }

			}

			this.summary = this.amount + this.delivery_cost + this.dataService.cart.delivery.packing_charges;
			console.log(this.summary);
		})
		.catch(err => {
			this.toastr.error(err)

		})
	 
  }

  getLocation(){
    this.dataService.getLocationService()
    .then( resp => {
		if (resp.lat){
			this.orderData.location.lat = resp.lat;
		}
		else{
			this.orderData.location.lat = 1
		}
		
		if (resp.lon){
			this.orderData.location.lon = resp.lon;
		}
		else{
			this.orderData.location.lon = 1
		}
    })
    .catch( err => {
      this.toastr.error(err);
    })
  }

  checkWallet() { 
		if (this.dataService.userData.useWallet && this.wallet >= this.cost) { 
			let radio = <HTMLInputElement>document.querySelector('input[name="method"]');
			radio.checked = false;
			return true;
		 }
		return false;
	}

	updateTotal(checked){
		
		
		if (checked){
			this.amount = this.cost - this.wallet;
			this.summary = this.amount + this.delivery_cost + this.dataService.cart.delivery.packing_charges;
		}
		else {
			this.amount = this.cost;
			this.summary = this.amount + this.delivery_cost + this.dataService.cart.delivery.packing_charges;
		}
	}

 getMethod() {

	if (this.checkWallet()) { 
		return "wallet";
	}

	else {
		let method = (<HTMLInputElement>document.querySelector('input[name="method"]:checked'))?.value;
		if (method) { return method; }
		return false;
	}
  }

  Order() { 
	var method = this.getMethod();

	if ( method  && this.shippingAddr ) {
			this.orderData.wallet = this.dataService.userData.useWallet ? Math.min(this.wallet,this.cost) : 0;
			this.orderData.address_id = this.shippingAddr;
			this.orderData.preferred_payment = method;
			this.orderData.category_id = this.category;
			this.orderData.packing = this.dataService.cart.delivery.packing_charges;
			this.orderData.takeaway = this.dataService.cart.delivery.takeaway;
		

			console.log("orderssss", this.orderData);

			this.user.placeOrder(method, this.orderData).then(x => {
				if(x && ( method === "cod" || method === "wallet" ) ) {	
					this.clearCart();

					// this.user.clearCartItems().then(x => { if (x) { this.clearCart(); } });
					// swal({
					// 	title: "Order Successfully Placed!",
					// 	text: "Go track your orders at Orders page.",
					// 	icon: "success",
					// })
					// .then( okay => {
					// 	if(okay){
					// 		this.goHome();
					// 	}
					// })
				}
				else if (x && method === "razorpay") {
					this.payWithRazorpay(x); 
				}
				else { console.log("Something Went Wrong");}
			});
		}
	else {
		this.toastr.error("Missing some fields");
		}
  } 
 
	payWithRazorpay(order) {
		var total = Math.ceil(order.amount * 1.03) * 100; // by including 3 % tax
		var options = {
			name: "MeeBuddy Shopping",
			payment_capture: 1,
			description: "Payment for Meebuddy Center Shopping Order.",
			image: "https://meebuddy.com/images/min_logo_meebuddy.jpg",
			order_id: order.rzp_order_id,
			currency: "INR",
			key: "rzp_live_DJA2rvcCmZFLh3",
			amount: total,
			prefill: {
				name: this.dataService.userData.info.name,
				email: this.dataService.userData.info.email || "sample@meebuddy.com",
				contact: this.dataService.userData.info.mobile_num,
			},
			notes: {
				center_id: this.dataService.center._id,
				center_name: this.dataService.center.id,
				payment_for: "center shopping order",
				Refund : "Meebuddy testing"
			},
			theme: {
				color: "#3399cc",
			},
			modal: {
				"ondismiss": function(){
					  console.log("Checkout form closed"); 
					  cancelCallback("Payment Cancelled!");
				}
			},
			handler: response => {
                        var payment_data = {
                                order_id: order.order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                        };

                        this.user.paymentVerify(payment_data).then(res => { 
							if(res) {
								this.clearCart();

									// this.user.deleteCartCats({"category_id":this.category}).then(x => {

									// 	if (x) { 
									// 		this.clearCart();
									// 		 } 
									// 	});
									// 	swal({
									// 		title: "Order Successfully Placed!",
									// 		text: "Go track your orders at Orders page.",
									// 		icon: "success",
									// 	})
									// 	.then( okay => {
									// 		if(okay){
									// 			this.goHome();
									// 		}
									// 	});
									}
						});
                        console.log(response,payment_data);
			}
		};

		var cancelCallback = error => {
			console.log("Cancelling");
			this.user.deleteOrder(order.order_id, error)
			.then(res => {
				if(res){
				  swal({
					  title: "Online payment cancelled!",
					  text: "Go back and place the order again.",
					  icon: "error",
				  })
				}
			});
		};
		var RazorpayCheckout = new Razorpay(options);
		RazorpayCheckout.on("payment.failed", cancelCallback);
		RazorpayCheckout.open();
	}





  back() { this.value.emit(this.stage-1); }

  goHome(){ this.router.navigate(["/home"]); }

  clearCart() { 
  	this.user.deleteCartCats({"category_id":this.category}).then(x => {

	if (x) { 
		// this.clearCart();
	  	this.dataService.cart.total = 0; this.dataService.removeCart(this.category,true); 
			swal({
				title: "Order Successfully Placed!",
				text: "Go track your orders at Orders page.",
				icon: "success",
				buttons: ["Back to Cart", true],
			})
			.then( okay => {
				if(okay){
					this.goHome();
				}
			});
		 }
	});
  }

}
