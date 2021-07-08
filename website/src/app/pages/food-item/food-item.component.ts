import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from "../../_services/data.service";
import { CenterService } from "../../_services/center.service";
import { UserService } from "../../_services/user.service";
import { AlertService } from "../../_services/alert.service";
import { GuestService } from "../../_services/guest.service";
import { CommonService } from "../../_services/common.service";

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss']
})
export class FoodItemComponent implements OnInit {

  @Input()
  card: any;

  @Output()
  favItem = new EventEmitter();

  @Output()
  bottomCart = new EventEmitter();

  first: any;
  selected: any ;
  block = false;
  cartBlock= false;
  q: any = 1;

  constructor(
	public dataService: DataService,
	private center: CenterService,
	private user: UserService,
	private toastr: AlertService,
	private guest: GuestService,
	public common: CommonService
	) { }

  ngOnInit(): void {
	this.first = [this.card.quantities[0]];
	this.selected = this.first;
  console.log("carrdd", this.card)
  }

  wishlist(Id){

    if (!this.dataService.userData.isSignedIn) { this.toastr.error("Login required"); return; }
    if (this.block) { console.log("Blocked"); return }
    this.block = true;
    this.common.Load();

    if(this.dataService.checkWishlist(Id)) {
//	this.common.loadLogo = true;
        this.user.removeWishlist(Id).then(res => {
                if (res) { this.dataService.removeFav(Id); this.favItem.emit(Id); this.block=false; this.common.unLoad(); }
        });

    } else {
	
        this.user.addWishlist(Id).then(res => {
                if (res) { this.dataService.addToWishlist(Id); this.block=false; this.common.unLoad(); }
        });
    }
  }

/*
  add2cart(CARD) {

	if (this.cartBlock) {return}
        this.cartBlock = true;
	this.common.loadLogo = true;

	if (!this.dataService.userData.isSignedIn) {
		CARD.quantities = this.selected; 
		this.guest.add2cart({count: 1 , product: CARD, _id: CARD._id});
		this.cartBlock = false;
		this.common.loadLogo = false;
		return;
	}
	
	this.user.addToCart(this.selected[0]._id,this.selected[0].product_cost).then(res => { this.cartBlock = false; this.common.loadLogo = false; });
  }  */

}
