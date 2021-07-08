import { Component, OnInit, ElementRef, ViewChild,HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CenterService } from "../../../_services/center.service";
import { UserService } from "../../../_services/user.service";
import { DataService } from "../../../_services/data.service";
import { CommonService } from '../../../_services/common.service';


@Component({
  selector: 'app-restaurant-items',
  templateUrl: './restaurant-items.component.html',
  styleUrls: ['./restaurant-items.component.scss']
})
export class RestaurantItemsComponent implements OnInit {

  searchFood = [];
  status : boolean = false;
  products: any[] = [];
  productszero: any = [];
  sub: any[] = [];
  p: number = 1;
  id: string;
  name: any;
  url_name: any;
  value : string;
  item_tags : any[] = [];
  shopTitle : any;
  maxSize: number = 5;
  foodItems: any = [];
  floatingTitle: any;
  titles: any;
  scrollable: any;
 loading: boolean = false;

  @ViewChild('showBottom') button: ElementRef;
  canShow = false;

  constructor(private common:CommonService, private route: ActivatedRoute, private center: CenterService, public dataService : DataService, private user:UserService) 
  {
  
    this.getItems();
    // console.log('food page center id'+this.center.getCenterId());
  }

  ngOnInit(): void { 
//	console.log(this.searchFood);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
	this.stickyScroll();
  }

  onScrollDown(ev) {
    console.log("scrolled down!!", ev);
  }

  onUp(ev) {
    console.log("scrolled up!", ev);
  }

  stickyScroll() {
	let ff = <HTMLInputElement>document.querySelector('.stick-filter');
	if (window.pageYOffset > ff.getBoundingClientRect().top + 80) { 
		ff.style.position = "fixed";
		if (window.innerWidth > 900) { ff.style.width = "20%"; ff.style.top = "0px"; }
		else { ff.style.top = "-75px" ; ff.style.height= "100%"}
	 }
	else {
		ff.style.top = ""; ff.style.position = ""; ff.style.width = "";
	}
  }

  searchWord(e) {
    let searchWord = e;
    this.foodItems = [];
    this.searchFood.forEach(val => this.foodItems.push(Object.assign({}, val)));
    if (searchWord.length > 1){
      this.foodItems.forEach( obj => {
        obj.list = obj.list.filter( item => {
          return item.name.toLowerCase().includes(searchWord.toLowerCase());
        });
      });
   }

  }

/*
  RadioVal(val){

    if (val == "low2high") { this.products[0].items.sort((a, b) => a.quantities[0].product_cost - b.quantities[0].product_cost) }

    else if (val == "high2low") { this.products[0].items.sort((a, b) => b.quantities[0].product_cost - a.quantities[0].product_cost) }

    else if(val == "all"){
      this.getAll();
    }

    else{
      this.getProductByTag(val);
    }

  }

*/

  getItems(){

    this.name = this.route.snapshot.paramMap.get('center-name');
    this.url_name = this.route.snapshot.paramMap.get('url-name');
    // this.id  = this.name.pop()
    this.center.getShopItems("shopping",this.name, this.url_name) 
	  .then(res => { 
	      console.log("Items res", res);
        if (res !== undefined){
          this.products = [res];
          // console.log(this.products);
  	      this.item_tags = this.products[0].sub_categories;
  	      this.divideData();

        }
	});   
  
  console.log("items", this.products)
  }


  divideData() {
	this.item_tags.forEach(tag => {
		let output = this.products[0].items.filter(item => { return tag === item.sub_category });
		this.foodItems.push({ sub_category: tag, list : output});
		this.searchFood.push({ sub_category: tag, list : output});
	});
	this.loading = false;
  this.canShow  = true;

  }

}
