import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { APIService } from "../../../_services/api.service";
import { LocationService } from "../../../_services/location.service";
import { DataService } from "../../../_services/data.service";

//import { Router } from '@angular/router'; 

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  autocompleteError:boolean;
  user_location;
  State: any;
  keyword = 'name';
  
  data : any[] = [];

  constructor(private api: APIService, private locationService: LocationService, public dataService: DataService) { }

  ngOnInit() {
	// this.locationService.getStates().then(res => this.data = res);
	// console.log(this.data);
  }
 
  selectEvent(item) {
    this.user_location = true;
    this.State=item;
    this.dataService.setLocation("state",item._id);
  }

  onFocused(){
    console.log("focused");
    let location_el = document.getElementById("locpop");
    location_el.click();
  }

  submit(){
	if (!this.State){
		this.autocompleteError = true;
	}
	else{
    this.autocompleteError = false;
	}
  }


}



