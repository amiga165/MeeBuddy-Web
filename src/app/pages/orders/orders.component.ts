import { Component, OnInit } from '@angular/core';
import { UserService } from "../../_services/user.service";
import swal from "sweetalert";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  myserviceDup :any = [];
  myservice: any = [];
  mycards: any = [];
  p: number = 1;
  q:number = 1;
  r:number = 1;
  fresh: boolean;
  imageOrder: any = [];
  ratingOrderID : any;
  serviceOrder: any;
  imageData: any;
  autoHide: any;

  badges = {
	"process": "badge-info",
	"success": "badge-success",
	"warning": "badge-warning",
	"danger": "badge-danger"
  }

  
  constructor(
	private user: UserService
	) { 
		this.getOrder();
	}

  ngOnInit(): void {

  }

  getBadge(status) {
	let defaultBadge = {
		"placed": this.badges.process,
		"confirmed": this.badges.process,
		"delivered": this.badges.success,
		"finished": this.badges.success,
		"deleted": this.badges.danger,
		"rejected": this.badges.danger,
		"pending": this.badges.warning,
		"assigned": this.badges.process,
		"shipped": this.badges.process
	};
	return defaultBadge[status];
  }

  selectServiceOrder(details) { this.serviceOrder = details; }

  orderImage(image) { this.imageData = image; }

  dateFilter(value) { 
	if (value === "all") { this.myservice = this.myserviceDup; }
	else { this.user.getOrderServices({ 'time':value }).then(res => { this.myservice = res; console.log(res,value)}); }
  }


  cancelOrder(id) {

	swal({
	   title: 'Cancel Order?',
	   text: 'Are you sure Wanna delete the Order?',
	   icon: 'warning',
	   buttons: {
	      cancel: true,
	      confirm: true,
	  },
	}).then(ok => {
		if (ok) { this.user.cancelOrder({ 
				order_id: id}).then(x => { 
					this.mycards.filter(x => x._id == id)[0].status = "deleted";
				}); 
				console.log("Order Canceled");
			 } 
	});
  }

  getOrder() {

	this.user.getOrders().then(x => { this.mycards = x; console.log("Ding Dong",this.mycards, this.mycards.length);})
	this.user.getOrderServices({}).then(res => { this.myservice = res; this.myserviceDup = res; console.log("Servicesss",this.myservice, this.myservice.length); })
	this.user.getImageOrders().then(order => { this.imageOrder = order; console.log("Images",this.imageOrder); })
  } 


  open(id) { this.ratingOrderID = id; this.fresh= true;  }

  setClose(val) { this.fresh = val; this.serviceOrder = ""; this.imageData = ""; }  

}
