import { Component, OnInit } from '@angular/core';
import { LocationService } from "../../_services/location.service";
import swal from 'sweetalert';

@Component({
  selector: 'app-order-anyitem',
  templateUrl: './order-anyitem.component.html',
  styleUrls: ['./order-anyitem.component.scss']
})
export class OrderAnyitemComponent implements OnInit {

  items: any = [];
  inputCount = 1;
  location: any = {};
  orderData = {address_id: "", chosen_delivery_time: "", location: "", items_list: []};  

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
	this.items.push({name:"", count: 1, pos: this.inputCount});
	this.locationService.getPosition().then(x => console.log(x));
  }

	checkInput(itemName) {
		console.log(itemName,this.items[this.inputCount-1]);
		if(this.items[this.items.length-1].name && itemName) {
			console.log(itemName); this.inputCount+=1; this.items.push({name:"", count: 1, pos: this.inputCount}); 
		}
	}
	
	setInc(x) { this.items[x].count+=1; console.log(this.items); }

	setDec(x) { 
		if (this.items[x].count>1) { this.items[x].count -=1 ; console.log(this.items); }
	}

	remove(x) { if(this.items.length) { this.items.splice(x,1); this.inputCount-=1; console.log(this.items); } else {this.items[x] = {name:"", count:1 } } }

	filterData() { 
		this.items = this.items.filter(x => { return !!x.name }); 
		this.items.map(x => { delete x.pos; })
	}

	placeOrder() {
		this.filterData();
		console.log(this.items);
		swal("Order Placed!",{
		  icon: "success",
		
		});
	}

	getLocation() {
		if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			if (position) {
			  console.log("Latitude: " + position.coords.latitude +
			    "Longitude: " + position.coords.longitude);
			  this.location.lat = position.coords.latitude;
			  this.location.lon = position.coords.longitude;
			  console.log(this.location.lat);
			  console.log(this.location.lon);
			  }
			},
			(error) => console.log(error)
		);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

}
