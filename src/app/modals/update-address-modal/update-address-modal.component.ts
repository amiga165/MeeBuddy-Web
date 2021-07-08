import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { LocationService } from 'src/app/_services/location.service';
import { convertToObject } from 'typescript';
import { AlertService } from "../../_services/alert.service";
import { APIService } from "../../_services/api.service";
// import { AuthService } from "../../_services/auth.service";
import { DataService } from "../../_services/data.service";

@Component({
  selector: 'app-update-address-modal',
  templateUrl: './update-address-modal.component.html',
  styleUrls: ['./update-address-modal.component.scss']
})
export class UpdateAddressModalComponent implements OnInit {

	address: FormGroup;
	// focus : boolean = false;
	// focus1 : boolean = false;
	// valid : boolean = true;
    //     phone: number;
	data : any = {};
	locationData : any = {}; 
	villages: any =[];
	mandals: any = [];
	keyword: "name";
	url: any;
	areaDetails: any;
	@Output() closeModalEvent = new EventEmitter<boolean>();

	constructor(
		private formBuilder: FormBuilder, 
		private toastr : AlertService,
		private api : APIService,
		private dataService: DataService,
		private common: CommonService,
		private locationService: LocationService,
		private router: Router
	){
		this.areaDetails = {}
	}


	ngOnInit() {
		this.url = window.location.href.split("/").pop()

		this.getVillages(this.url);

		
		
		this.address = this.formBuilder.group({
			mandal : [''],
			village: ['']
		});


	}

	
	getVillages(url:any){
		this.api.postReq("/common/area-details", {url_name: url})
			.then((res:any) => {
				this.mandals = res.data.mandals;
				this.villages = res.data.villages;
				console.log("area details", this.villages,this.mandals);
			})
			.catch((err) => {
				this.toastr.error("Something went wrong")
			})
	}

	get f() { return this.address.controls; }
	




   submit() {
	
	console.log("evennn", this.address.value)
	if (!this.address.value.village){
		this.toastr.error("Select a village")
		return
	}
	this.locationData.village = this.address.value.village;
	console.log("vlll", this.locationData.village);

	let location = JSON.parse(localStorage.getItem("Location"))
	console.log("hello",location);
	
	
	this.locationService.selectVillage(this.locationData.village).then((x:any) => {
		if (x.bool) { 
			console.log("jokree", x.res)
	        localStorage.setItem("Location",JSON.stringify(x.res.data));
			this.dataService.getFullData();
			// this.router.navigate(['/home']);
			
		}
	
	});
   }
	
	

}
