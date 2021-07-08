import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { DataService } from "../../_services/data.service";
import { GuestService } from "../../_services/guest.service";

@Component({
  selector: "app-servicenavbar",
  templateUrl: "./servicenavbar.html",
  styleUrls: ["./servicenavbar.scss"],
})
export class ServiceNavbarComponent implements OnInit {
  isCollapsed = true;

  constructor(
    private router: Router,
    public dataService: DataService,
    public guest: GuestService
  ) {
      router.events.subscribe((val) => {  
      this.isCollapsed = true;
    });
  }

  mobileView() {
    if (window.innerWidth < 992) {
      return true;
    }
    return false;
  }
  
  ngOnInit() {
    console.log(this.dataService.userLocation?.village?.name);
  }

  toggle() {
    let ff = document.getElementById("menu-btn");
    ff?.click();
  }
}
