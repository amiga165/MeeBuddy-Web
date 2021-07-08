import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CenterService } from "../_services/center.service";
import { AlertService } from "../_services/alert.service";
import { CommonService } from "../_services/common.service";

@Injectable({ providedIn: 'root' })
export class CenterGuard implements CanActivate {

    constructor(
		private router: Router,
		private center: CenterService,
		private toastr: AlertService,
		private common: CommonService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

	this.common.Load();

	return this.center.checkCenter().then(res => {

		if (res) { this.common.unLoad(); return true; }

		this.router.navigate(['/']);
		this.Loc();
		this.common.unLoad();
		return false;

		}); 
	}
	
	Loc(){
		document.getElementById("locpop").click();
	  }
}
