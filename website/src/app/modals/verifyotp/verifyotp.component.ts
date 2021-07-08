import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from "../../_services/alert.service";
import { APIService } from "../../_services/api.service";
import { AuthService } from "../../_services/auth.service";
import { DataService } from "../../_services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.scss']
})
export class VerifyotpComponent implements OnInit {

  otpCode: number;
  ratelimit: number = 0;
  canShow: boolean = true;
  timerLock: boolean = false;
  @ViewChild('cancel') closeTab: ElementRef;

  constructor( 
	private formBuilder: FormBuilder,
	private api : APIService,
	private toastr : AlertService,
	private auth:  AuthService,
	public dataService: DataService,
	private router: Router
  ) { }

  ngOnInit(): void {

  }


  verify() {
	this.auth.verifyOTP(this.otpCode)
	.then(x => { 
			if (x) { 
				this.dataService.getLoginData(); 
				this.closeTab.nativeElement.click();
				// console.log()
				// this.router.navigate(['/home']);
				location.reload();
			} 
		}); 
	this.closeTab.nativeElement.click();
	this.otpCode = undefined;
  }

  resend() { this.auth.getOTP(this.dataService.userData.signup,this.canShow); if ( !this.timerLock ) { this.timer(); } }

  timer() {
	this.canShow = false;
	this.timerLock = true;
	var timeleft = 59;
	var otpTimer = setInterval(function(){

	  if(timeleft <= 0){
	    clearInterval(otpTimer);
	    document.getElementById("countdown").innerHTML = "";
	    this.canShow = true;
	    this.timerLock = false;
	  } else {
	    document.getElementById("countdown").innerHTML = timeleft + " s";
	  }
	  timeleft -= 1;
	}, 1000);

  }

}
