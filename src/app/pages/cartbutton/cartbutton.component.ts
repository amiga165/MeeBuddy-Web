import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GuestService } from "../../_services/guest.service";
import { UserService } from "../../_services/user.service";
import { DataService } from "../../_services/data.service";
import { CommonService } from "../../_services/common.service";
import { CenterService } from 'src/app/_services/center.service';
// import { APIService } from 'src/app/_services/api.service';
import { esLocale } from 'ngx-bootstrap/chronos';


@Component({
  selector: 'app-cartbutton',
  templateUrl: './cartbutton.component.html',
  styleUrls: ['./cartbutton.component.scss']
})
export class CartbuttonComponent implements OnInit {

  @Input() CARD;
  @Input() quantity;

  toggle: boolean = false;
  cartBlock: boolean = false;
  isSameVillage: boolean = true;
  userCenterId: any = "";
  itemCenterId: any = "";

@Output() 
refreshCart = new EventEmitter();

  constructor(
	public dataService: DataService,
	private user: UserService,
	private guest: GuestService,
	private common: CommonService,
        private center: CenterService,
	) {
           
                this.userCenterId = ""
        //         this.getCenterId().then((res) => {
        //   //console.log('rassdsdsed');
        //         this.userCenterId = res;
                
        //          this.itemCenterId = this.CARD.center;
        // console.log('card center'+this.CARD.center);
        // console.log('user center'+this.userCenterId);


        //  if (this.userCenterId !== this.itemCenterId){
        //                 this.isSameVillage = false;
        //                 console.log('invalidddddd');
        //         }
        //         else {
        //                 this.isSameVillage = true;
        //                    console.log('sucessssssss');
                

        //         }
                  
                
        // });
                // this.url_name = this.route.snapshot.paramMap.get('url-name');
         }

  ngOnInit(): void {
        
       

    
  }

  checkCenter(){
      // console.log(this.center.centerid);
      if (this.center.centerid === this.CARD.center){ return true; }
      else { return false; }
  }



 setInc(){
//	this.common.Load();
	console.log(this.quantity);
	let cart_item = this.cartItem();
   if (this.dataService.userData.isSignedIn) {
	this.common.Load();
	   let cart_item = this.cartItem();
	  
           this.user.cartIncrement(cart_item._id).then(res => {
                if(res) {
			console.log(res, this.quantity[0]._id);
                        this.dataService.incrementCartItem(this.quantity[0]._id);
			this.common.unLoad();
                }
		else { this.common.unLoad(); }
        });
   }
   else { this.guest.incrementCartItem(this.quantity[0]._id); }

 }

 setDec(){
//	this.common.Load(); 
        console.log(this.quantity);

   let cart_item = this.cartItem();
   if (this.dataService.userData.isSignedIn) {
	this.common.Load();
        if(cart_item.count > 1){
                this.user.cartDecrement(cart_item._id).then(res => {
                        if(res) {
                                this.dataService.decrementCartItem(this.quantity[0]._id);
				this.common.unLoad(); 
                        }
			else { this.common.unLoad(); } 
                });
        }
        else{
                this.deleteItem();
                this.refreshCart.emit("refresh");
        }
   }
   else { if(cart_item.count > 1){ this.guest.decrementCartItem(this.quantity[0]._id); } else { this.deleteItem(); } }

 }

 deleteItem(){
        console.log(this.quantity);

//	this.common.Load();
           if (this.dataService.userData.isSignedIn) {
		this.common.Load();
		let cart_item = this.cartItem();
                this.user.removeCartItem(cart_item._id).then(x => { this.dataService.removeCart(cart_item._id);
                
                this.common.unLoad();
                 });
//		this.common.logoLoad = false;
                
        }

        else { this.guest.removeCart(this.quantity[0]._id); }
  }


  add2Cart() {
        // console.log(this.quantity);

        if (!this.checkCenter()){
                return
        }

        if (this.cartBlock) {return}
	this.common.Load();
        this.cartBlock = true;
	console.log(this.CARD);
        if (!this.dataService.userData.isSignedIn) {
		console.log(this.CARD);
//                this.CARD.quantities = this.quantity;
                this.guest.add2cart({count: 1 , product: this.CARD, _id: this.CARD._id, quantity: this.quantity[0]._id});
                this.cartBlock = false;
		this.common.unLoad();
                return;
        }

        this.user.addToCart({"item_id":this.CARD._id,"quantity_id":this.quantity[0]._id,"count":1})
	.then(res => { 
                res.product = this.CARD;
		console.log(this.dataService.cart.list, res);
		this.dataService.addToCart(res);
		this.cartBlock = false; this.common.unLoad();
	});
  }


	cartItem() {

		return this.dataService.userData.isSignedIn ? this.dataService.getCartItem(this.quantity[0]._id)[0] : this.guest.checkDup(this.quantity[0]._id) ;
	}

	count() {
		return this.cartItem() ? this.cartItem().count : 1 ; 
	}

}

