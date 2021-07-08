import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  location;

  ngOnInit() {
	this.location = location.pathname;
  }

  


}
