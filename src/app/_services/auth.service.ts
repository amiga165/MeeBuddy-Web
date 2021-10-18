import { Injectable } from '@angular/core';
import { AlertService } from "../_services/alert.service";
import { APIService } from "./api.service";
import { Router} from '@angular/router';
import { DataService } from "./data.service";
import { LocationService } from "./location.service";
import { GuestService } from "./guest.service";
import { UserService } from "./user.service";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	
	public status : boolean;
	public guestCart: any = {};
	
	constructor(

		private api : APIService,
		private toastr : AlertService,
		private router : Router,
		private dataService: DataService,
		private location: LocationService,
		private guest: GuestService,
		private user: UserService,
		private common: CommonService

	) { }
	
	
	loadCart(){
		this.guestCart = this.guest.guestCart.items
		if (this.guestCart) {
			this.guestCart.forEach((res) => {
				console.log(res.quantity);
				this.user.addToCart({"item_id":res._id,"quantity_id":res.quantity,"count":res.count}).then(x => { console.log("Guest",x);});
			});
			localStorage.removeItem("guestCart");
		}
	}
	
	checkUser(){
		return this.api.postReq("/user/check",{})
		.then((res: any) => {
			if (res.status == "success"){
				return true
			}
			else { return false }
		})
		.catch(err => { return false });
	}
	
	getOTP(data,valid){
		if (! valid) { this.toastr.error("Invalid Attempt !!!"); return; } console.log(data);
		this.api.postReq("/common/signup", data)
		.then((res: any) => {
			if (res.status == "success") { this.dataService.signup(data); this.toastr.success(res.data); }
			else { this.toastr.error("Something went wrong !"); }
		})
		.catch(err => { this.toastr.error("Invalid Options"); });
	}
	
	verifyOTP(otpCode){
		return this.api.postReq("/common/verify",{"mobile_num": this.dataService.userData.signup.mobile_num ,"otp": otpCode})
		.then((res: any) => {
			if (res.status == "success"){
				this.dataService.login();
				this.common.setToken(res.token);
				this.location.selectVillage(this.dataService.userLocation.village.id);
				this.loadCart();
				this.toastr.success("OTP Verifed !!!");
				return true;
			}
			else { this.toastr.error("Something Went Wrong"); }
		})
		.catch(err => { console.log(err);this.toastr.error("Invalid OTP"); });
	}
	
	signin(data){
		alert(data.mobile_num);
		console.log('dada'+data);
		
	}
	

	logout() {
		this.api.postReq("/user/logout",{})
		.then((res: any) => {
			if (res.status == "success"){
				console.log(this.dataService.reset);
				this.dataService.reset();
				this.common.setToken(res.token);
				this.router.navigate(['/home']);
				this.toastr.success("Logged out !!!");
			}
			else { this.toastr.error("Something Went Wrong"); }
		})
		.catch(err => { console.log(err);this.toastr.error("Invalid OTP"); });
	}

}
