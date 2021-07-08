import { Component, OnInit, Input } from '@angular/core';
import { APIService } from "../../_services/api.service";
import { DataService } from "../../_services/data.service";
import { LocationService } from "../../_services/location.service";
import { CommonService } from "../../_services/common.service";
import { FormControl } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-locationmodal',
  templateUrl: './locationmodal.component.html',
  styleUrls: ['./locationmodal.component.scss']
})
export class LocationmodalComponent implements OnInit {

  autocompleteError:boolean = false;

  states: any = {};

  districts : any = {};
  mandals : any = {};
  villages: any = {}
  keyword = 'name';
  locationData : any = {}; 
  data : any[] = [];

  constructor(
	private api: APIService, 
	private locationService: LocationService, 
	private router: Router, 
	private dataService: DataService,
	private common: CommonService
	) { }

  ngOnInit() {
		this.locationService.getStates().then(res => this.states = res);
  }


  clearInputs(index) {
	let inps = [
		 document.getElementById("state-inp") ,
		 document.getElementById("district-inp") ,
		 document.getElementById("mandal-inp") ,
		 document.getElementById("village-inp") 
	];
	let vals = ["state","district","mandal","village"];
	inps.slice(index).forEach(x => {
		let element = x.children[0]?.children[0]?.children[1];
//		element?.click();
	});
	vals.slice(index).forEach(x => {
		this.locationData[x] =  "";
	});
  }

  stateEvent(item) { 
			this.locationData.state = item._id; 
			this.common.Load();
			this.locationService.getDistricts(item._id).then(res => {
				this.districts = res; 
				this.common.unLoad(); 
			});
			this.clearInputs(1);
		} 

  districtEvent(item){ 
			this.locationData.district = item.name ; 
			this.common.Load();
			this.locationService.getMandals(item._id).then(res => {
				this.mandals = res;
				this.common.unLoad();
			}); 
                        this.clearInputs(2);
		}

  mandalEvent(item) { 
			this.locationData.mandal = {name: item.name, id:item._id }; 
			this.common.Load();
			this.locationService.getVillages(item._id).then(res => {
				this.villages = res;
				this.common.unLoad();
			});
            this.clearInputs(3); 
		}

  villageEvent(item){ 
		this.locationData.village = { name:item.name, id:item._id };
		}

   submit() {
	this.common.Load() ;
	this.locationService.selectVillage(this.locationData.village.id).then((x:any) => {
		if (x.bool) { 
	        localStorage.setItem("Location",JSON.stringify(x.res.data));
			this.dataService.getFullData();
			this.router.navigate(['/home']);
		}
		this.common.unLoad();
	});
   }



}
