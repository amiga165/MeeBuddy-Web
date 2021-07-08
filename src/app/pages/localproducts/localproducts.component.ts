import { Component, OnInit } from '@angular/core';
import { CenterService } from "../../_services/center.service";
import { CommonService } from "../../_services/common.service";
import { HelperPipe } from "../../_helpers/help.pipe";

@Component({
  selector: 'app-localproducts',
  templateUrl: './localproducts.component.html',
  styleUrls: ['./localproducts.component.scss']
})
export class LocalproductsComponent implements OnInit {

  products: any = [];
  p: number = 1;
  loading : boolean = true;
  maxSize : number = 5;

  constructor(
	private center: CenterService,
	private common: CommonService,
	private PIPE: HelperPipe
	) { }

  ngOnInit(): void {
	this.getProducts();
  }

  getProducts(){

    this.center.getCategories("local-product")
    .then(res => {
      this.products = res;
      console.log(this.products);
	this.loading = false;
    });

  }


}

