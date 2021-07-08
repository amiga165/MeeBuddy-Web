import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../_services/common.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  isMobile: boolean  = false;
  fragment: any;
  constructor( private common: CommonService ) { 

}

  ngOnInit(): void {

//	this.common.hideLoad();

	onhashchange = (e) => { 
		let hash = new URL(e.newURL).hash;
		document.getElementById(location.hash.slice(1)+"-tab").click();
	};


	if (location.hash) {
		document.getElementById(location.hash.slice(1)+"-tab").click();
	}
	this.mobile();
  }


  mobile() {
	if (window.innerWidth <= 480){ this.isMobile = true;}
	else {this.isMobile = false;}

	}

}
