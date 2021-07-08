import { Component, OnInit } from '@angular/core';
import { CenterService } from "../../_services/center.service";
import { CommonService } from "../../_services/common.service";
import { HelperPipe } from "../../_helpers/help.pipe"

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  items: any[] = [];
  result: any[] = [];
  p = 1;
  loading: boolean =  true;
  maxSize: number = 5;

  constructor(private center: CenterService, private common: CommonService, private PIPE: HelperPipe) { }

  ngOnInit(): void {

	this.getData();

  }

  getData() {
	this.center.getCategories("shopping").then(res => { console.log(res, res.length); this.items= res; this.loading = false; });
  }

}

