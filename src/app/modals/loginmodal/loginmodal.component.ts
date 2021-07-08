import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from "../../_services/alert.service";
import { APIService } from "../../_services/api.service";
import { AuthService } from "../../_services/auth.service";
import { DataService } from "../../_services/data.service";

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.scss']
})
export class LoginmodalComponent implements OnInit {

	login: FormGroup;
	focus : boolean = false;
	focus1 : boolean = false;
	valid : boolean = true;
    phone: number;
	data : any = {};

	constructor(
		private formBuilder: FormBuilder, 
		private toastr : AlertService,
		private api : APIService,
		private auth: AuthService,
		private dataService: DataService
	){}


	ngOnInit() {
		this.login = this.formBuilder.group({

			contact : ['', [Validators.required, Validators.maxLength(10),Validators.minLength(10),Validators.pattern("^[6-9]{1}\\d{9}$")]],
			mail: ['',Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")],
			referral: ['', Validators.pattern("^MB[0-9A-Z]{5}$")]
			
		});
	}


	get f() { return this.login.controls; }


        submit(){

		if (this.login.invalid) { 
			this.valid = false;
			 this.toastr.error("Invalid Data Provided");
		}

		else {
			let data = this.login.value;
			let formData = {
				mobile_num: data.contact,
				email: data.mail,
				referral_code: data.referral
				}

			this.dataService.signup(formData);
			this.valid = true; 
			this.auth.getOTP(formData,this.valid);
			
		}	
	}
	

}
