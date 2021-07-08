import { Component, OnInit } from '@angular/core';
import { CenterService } from "../../_services/center.service";
import { CommonService } from "../../_services/common.service";
import { HelperPipe } from "../../_helpers/help.pipe"

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  items: any[] = [];
  result: any[] = []
  p = 1;
  loading: boolean = true
  constructor(private center: CenterService, private common: CommonService, private PIPE: HelperPipe) { }

  ngOnInit(): void {
	// this.center.getCategories("shopping").then(res => {
	// 	this.center.getSubCategories("shopping",this.center.getIdByName("restaur",res,false)[0]).then(r => {
	// 		this.items = r;
	// 	}); 

	// 	this.loading = false;
	// });
	// console.log(this.items);
  }

}
