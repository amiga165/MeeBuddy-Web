import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from "../../_services/user.service"; 

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  order: any = {};
  name: any ;
  id : any;
  processing: true;

  constructor(private route: ActivatedRoute, private user: UserService) { }
  
  ngOnInit(): void {
	this.getSummary();
  }

  getSummary() {

    this.name = this.route.snapshot.paramMap.get('id').split("-");
    this.id  = this.name.pop();
    this.user.getOrderItems({ order_id: this.id }).then(x => {
		this.order = x;
		this.processing = this.order.rejected_time || this.order.deleted_time;
	});
    console.log(this.id);

  }

}
