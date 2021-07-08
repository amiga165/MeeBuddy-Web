import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CenterService } from "../../../_services/center.service";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  status : boolean = false;
  products: any[] = [];
  sub: any[] = [];
  p: number = 1;
  name: string = "";
  url_name: string = "";
  id :string = "";
  maxSize: number = 5;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private center: CenterService) { }

  ngOnInit(): void {

	this.getShops();
  }

  getShops(){

    this.name = this.route.snapshot.paramMap.get('center-name');
    this.url_name = this.route.snapshot.paramMap.get('url-name')
    // this.id = this.name.split("-").slice(-1)[0]; console.log(this.id);
    this.center.getShopSubCategories("shopping",this.name, this.url_name).
	then(res => {
		this.products = res;
		this.loading = false;
	});
  }

}
