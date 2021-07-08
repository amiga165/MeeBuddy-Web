import { Component, OnInit } from '@angular/core';
import { UserService } from "../../_services/user.service";
import { DataService } from "../../_services/data.service";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {

  userData : any = {};

  constructor( 
	private user: UserService, 
	public dataService: DataService
	) { 
		this.initUser();
	}

  ngOnInit(): void {

  }


  initUser() {
        this.user.getUser().then(res => { 
                console.log(res); this.dataService.userData.info = res;
        });

  }

}
