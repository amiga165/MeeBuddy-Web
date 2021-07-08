import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.scss']
})
export class Page500Component implements OnInit {

  constructor(){}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("error-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.add("bg-primary");
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("error-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.remove("bg-primary");
  }


}
