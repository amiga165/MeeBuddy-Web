import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CenterService } from "../../../_services/center.service";


@Component({
  selector: 'app-shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.scss']
})

export class ShopItemsComponent implements OnInit {

  status : boolean = false;
  products: any[] = [];
  productszero: any = [];
  sub: any[] = [];
  p: number = 1;
  id: string;
  name: string;
  value : string;
  item_tags : any[] = [];
  maxSize : number = 5;


  constructor(private route: ActivatedRoute, private center: CenterService) { }

  ngOnInit(): void {
	this.getItems();
  console.log("ittems", this.products)
  }

  RadioVal(val){

    if(val == "all"){
      this.getAll();
    }
    else if(val == "low2high"){
      this.products[0].items.sort( (item1 , item2) => item1.quantities[0].product_cost - item2.quantities[0].product_cost)
    }
    else if(val == "high2low"){
      this.products[0].items.sort( (item1 , item2) => item2.quantities[0].product_cost - item1.quantities[0].product_cost)
    }
    else{
      this.getProductByTag(val);
    }

  }

  getProductByTag(val){

    this.getAll();

    let items = this.products[0].items.filter( item => {
      return item.brand == val;
    });

    this.products[0].items = items;
  }

  getAll(){
    this.products = this.productszero.map(object => ({ ...object }))
  }


  getItems(){

    this.name = this.route.snapshot.paramMap.get('name');
    this.id = this.name.split("-").slice(-1)[0]; console.log(this.id);
    this.center.getItems("shopping",this.id)
	.then(res => { 
	      this.productszero = [res];
	      this.products = [res];
	      this.item_tags = this.products[0].item_tags;		
		if (this.products.length > 0){			this.products.forEach((list) => {
				list.items.forEach((key) => {
					if (key.images[0] === null) { key.images[0] = "../../../../assets/img/empty.jpg"}
				});

			});
		}
	});    

  }

}
