import { Injectable } from '@angular/core';
import { APIService } from "./api.service";
import { DataService } from "./data.service";
import { AlertService } from "../_services/alert.service";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  constructor(

		private api: APIService,
		private toastr: AlertService,
		private dataService: DataService,
		private common: CommonService

	) { }


	getPosition(): Promise<any> {

		return new Promise((resolve, reject) => {

			navigator.geolocation.getCurrentPosition(resp => {

				resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
			},
			err => {
				reject(err);
			});
		});
	}


   getStates(){
	
	return this.api.postReq("/common/states",{})
	.then((res: any) => {
		if (res.status == "success"){
			return res.data;
		} 
		else {console.log("Something Went Wrong");}
	})
	.catch(err => {console.log(err);})
   }

   getDistricts(district){

	return this.api.postReq("/common/districts",{"state_id": district })
	.then((res: any) => {
		if (res.status == "success"){
			return res.data;
		}
		else { console.log("-_-"); }
	})
	.catch(err => {console.log(err);});

   }

   getMandals(mandal){

	console.log("Mandal",mandal);	
	return this.api.postReq("/common/mandals",{"district_id":mandal})
	.then((res: any) => {
			if (res.status == "success"){
					return  res.data;
			}
			else { console.log("-_-"); }
	})
	.catch(err => {console.log(err);});

   }
   getSearchedVillages(key){
	return this.api.postReq("/common/search",{"key":key})
	.then((res: any) => {
			if (res.status == "success"){
					return  res.data;
			}
			else { console.log("-_-"); }
	})
	.catch(err => {console.log(err);});
   }

   getVillages(center){

	return this.api.postReq("/common/villages", {"mandal_id":center})
	.then((res: any) => {
                if (res.status == "success"){
                        return res.data;
                }
                else { console.log("-_-"); }

	})
        .catch(err => {console.log(err);});
   }

   selectVillage(village){
	
	return this.api.postReq("/common/location/select", {"village_id": village})
	.then((res: any) => {
			if (res.status == "success"){
		this.common.setToken(res.token);
		let data = {
			bool: true,
			res: res 
		}
		return data;
			}
			else { console.log("-_-"); }

	})
	.catch(err => {console.log(err);});
   }


}
