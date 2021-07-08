import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../_services/data.service";
import { GuestService } from "../../_services/guest.service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input()
  subamount: number;

  @Input()
  totalamount : number;

  min_order: any = 0;
//  delivery_cost: any = 0;

  constructor(public dataService: DataService, public guest: GuestService, private user: UserService) {  }

  ngOnInit(): void {
  }


  getDelivery() { return this.dataService.cart.total && !this.dataService.cart.delivery.takeaway ? this.dataService.cart?.delivery.delivery_cost : 0}

  getPackingCharges() { return this.dataService.cart.total && this.dataService.cart.delivery.packing_charges ? this.dataService.cart?.delivery.packing_charges : 0}

  getSubtotal() { return this.dataService.userData.isSignedIn ? this.dataService.cart.total : this.guest.total }

  getWallet() { return this.dataService.userData.info.wallet > this.getSubtotal()+this.getDelivery() ? this.getSubtotal()+this.getDelivery() : this.dataService.userData.info.wallet; }

  getTotal() {

	let cost = this.dataService.cart.total;
  if (cost) {
  	let wallet = this.dataService.userData.info.wallet;
    cost += this.getDelivery() ;

    if (this.getPackingCharges()) {
      cost += this.getPackingCharges();
    }

  	if (this.dataService.userData.useWallet) { 
  		if (cost >= wallet) { cost -= wallet; }
  		else { cost = 0 } 
  	}
  }
	return  this.dataService.userData.isSignedIn ? cost : this.guest.total;

	}

  danger() { return  this.dataService.userData.isSignedIn && this.dataService.cart?.delivery.minimum_order > this.getSubtotal() && this.dataService.cart.list.length > 0 }

}
