// import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AlertService } from "../../_services/alert.service";
// import { APIService } from "../../_services/api.service";
// import { AuthService } from "../../_services/auth.service";
// import { DataService } from "../../_services/data.service";

// @Component({
//   selector: 'app-loginmodal',
//   templateUrl: './loginmodal.component.html',
//   styleUrls: ['./loginmodal.component.scss']
// })
// export class LoginmodalComponent implements OnInit {

// 	login: FormGroup;
// 	focus : boolean = false;
// 	focus1 : boolean = false;
// 	valid : boolean = true;
//     phone: number;
// 	data : any = {};

// 	constructor(
// 		private formBuilder: FormBuilder, 
// 		private toastr : AlertService,
// 		private api : APIService,
// 		private auth: AuthService,
// 		private dataService: DataService
// 	){}


// 	ngOnInit() {
// 		this.login = this.formBuilder.group({

// 			contact : ['', [Validators.required, Validators.maxLength(10),Validators.minLength(10),Validators.pattern("^[6-9]{1}\\d{9}$")]],
// 			mail: ['',Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")],
// 			referral: ['', Validators.pattern("^MB[0-9A-Z]{5}$")]
			
// 		});
// 	}


// 	get f() { return this.login.controls; }


//         submit(){

// 		if (this.login.invalid) { 
// 			this.valid = false;
// 			 this.toastr.error("Invalid Data Provided");
// 		}

// 		else {
// 			let data = this.login.value;
// 			let formData = {
// 				mobile_num: data.contact,
// 				email: data.mail,
// 				referral_code: data.referral
// 				}

// 			this.dataService.signup(formData);
// 			this.valid = true; 
// 			this.auth.getOTP(formData,this.valid);
			
// 		}	
// 	}
	

// }








import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from "../../_services/alert.service";
import { APIService } from "../../_services/api.service";
import { AuthService } from "../../_services/auth.service";
import { DataService } from "../../_services/data.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from "../../_services/common.service";

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class LoginmodalComponent implements OnInit {

	login: FormGroup;
	focus : boolean = false;
	focus1 : boolean = false;
	valid : boolean = true;
    phone: number;
	data : any = {};
	msg="" as string ;
    isActive=true;
	isshow=0;
	signindata: FormGroup;
  @ViewChild('cancel') closeTab: ElementRef;	

	constructor(
		private formBuilder: FormBuilder, 
		private toastr : AlertService,
		private api : APIService,
		private auth: AuthService,
		private dataService: DataService,
		config: NgbModalConfig, private modalService: NgbModal,
		private common: CommonService
	){ config.backdrop = 'static';
    config.keyboard = false;}


	ngOnInit() {
		this.login = this.formBuilder.group({

			contact : ['', [Validators.required, Validators.maxLength(10),Validators.minLength(10),Validators.pattern("^[6-9]{1}\\d{9}$")]],
			mail: ['',Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")],
			referral: ['', Validators.pattern("^MB[0-9A-Z]{5}$")],
			password:['']
			
		});

		this.signindata = this.formBuilder.group({

			contact : ['', [Validators.required, Validators.maxLength(10),Validators.minLength(10),Validators.pattern("^[6-9]{1}\\d{9}$")]],
			password :['']
			
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
				referral_code: data.referral,
				password:data.password
				}

			this.dataService.signup(formData);
			this.valid = true; 
			this.auth.getOTP(formData,this.valid);
			
		}	
	}
	

		signin(){
		//	alert(this.signindata.value.password);
		//	console.log('login data'+ this.signindata.value.contact);
			if (this.signindata.value.contact == '' || this.signindata.value.password == '') 
			{ 
			//	this.valid = false;
				 this.toastr.error("Please fill all the fields");
			}
			else if(this.signindata.value.contact.length<=9)
			{
				this.toastr.error("Please enter valid mobile number");
			}
			else {
				let data = this.signindata.value;
				let formData = {
					mobile_num: data.contact,
					password:data.password,
					email:"",
					referral_code:"",
					hash_code:""
					}
		console.log(formData);
		this.api.postReq("/common/login",formData)
		.then((res: any) => {
			console.log('dataaaa'+res.status);
			if (res.status == "success"){
				//	this.closeTab.nativeElement.click();
					this.common.setToken(res.token);
					this.toastr.success("Login Success");
					location.reload();
			}
			else { this.toastr.error(res.message); }
		})
		.catch(err => { console.log(err);this.toastr.error(err.error.message); });

	

				
				
		}	
	}
		
	
	
	open(content:any) {
		this.modalService.open(content);
	  }
	
	openLg(content:any) {
		this.modalService.open(content, { size: 'lg' });
	  }
	

	showDisplay() {  

		this.msg = 'Recreate your Account!';
	  }  
	hideDisplay(){
		this.msg='';
	}
}
