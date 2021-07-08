import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../_services/auth.service";
import { AlertService } from "../_services/alert.service";
import { CommonService } from "../_services/common.service"

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
	private auth: AuthService,
	private toastr: AlertService,
	private common: CommonService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

	this.common.Load();
	return this.auth.checkUser().then(res => {

		if (res) { this.common.unLoad(); return true; }

                this.router.navigate(['/home']);
		this.toastr.error("Unauthorized !!!");
		this.common.unLoad();
                return false;
	});

    } 

}
