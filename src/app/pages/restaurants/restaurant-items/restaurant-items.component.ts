import { Component, OnInit, ElementRef, ViewChild,HostListener } from '@angular/core';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';

import { ActivatedRoute } from '@angular/router';
import { CenterService } from "../../../_services/center.service";
import { UserService } from "../../../_services/user.service";
import { DataService } from "../../../_services/data.service";
import { CommonService } from '../../../_services/common.service';
import { GuestService } from "../../../_services/guest.service";
import { APIService } from "../../../_services/api.service";


@Component({
  selector: 'app-restaurant-items',
  templateUrl: './restaurant-items.component.html',
  styleUrls: ['./restaurant-items.component.scss']
})
export class RestaurantItemsComponent implements OnInit {


 separateData: any = [];
 loadinga = true;

 category_id:any;
 category_name:any;

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

  constructor(private common:CommonService, private route: ActivatedRoute, private center: CenterService, public dataService : DataService, private user:UserService, public guest: GuestService, private apiservice: APIService) 
  {
    this.getCategorydetails();
    this.getItems();
    // console.log('food page center id'+this.center.getCenterId());
  }

  ngOnInit(): void { 
//	console.log(this.searchFood);


     this.user.getCartList().then(res => { 
    this.loadinga = false; 
    this.dataService.cart.list = res;
    //this.dataService.cart.list.filter(item => item.product.category === this.category_id);
    this.user.getCartCats().then(x => { this.separateData = x; this.filterCategories();});
    });   



  }

  calld(){
    return this.category_name;
  }


   refresh(e){
  this.user.getCartList().then(res => { 
    this.loadinga = false; 
    this.dataService.cart.list = res;
    //this.dataService.cart.list.filter(item => item.product.category === this.category_id);
    this.user.getCartCats().then(x => { this.separateData = x ; this.filterCategories();});
    });

  }


  filterCategories(){
    // console.log(this.separateData);
    if (this.dataService.userData.isSignedIn){
      this.separateData.forEach(x => {
        let catData = this.dataService.cart.list.filter(item => {return item.product.category === x._id});

        x.items = catData;  
      });
    }
    else {

      this.separateData = [{name: "Products", "items": this.guest.guestCart.items }];
    }

    return this.separateData;
  }




 getQuantity(Quantities,id) { let res = Quantities.filter(x => x._id === id);  return res; }


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

  getCategorydetails(){

    this.name = this.route.snapshot.paramMap.get('center-name');
    this.url_name = this.route.snapshot.paramMap.get('url-name');
    // this.id  = this.name.pop()
        this.apiservice.postReq("/common/get_category_by_urlname",{shop_url_name:this.url_name})
         .then((res: any)=>{
             console.log("restaraunt details"+ JSON.stringify(res));
             this.category_id = res.data._id;             
             this.category_name = res.data.name;
             
         })
    .catch(err => {
      //this.toastr.error(err.message);
    });


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

