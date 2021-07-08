import { Component, OnInit, Renderer2 } from "@angular/core";
import Headroom from "headroom.js";
import { Router } from '@angular/router';
import { DataService } from "./_services/data.service";
import { APIService } from "./_services/api.service";
import { CommonService } from "./_services/common.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit {

  constructor(
  private renderer: Renderer2,
	public router: Router, 
	private dataService: DataService,
	private api: APIService,
	public common: CommonService
  ){
	this.router.routeReuseStrategy.shouldReuseRoute = () => false;
}

  ngOnInit(){
    this.getLangData(); 
    this.dataService.getFullData();
  }

  // ngAfterViewInit() {
  //   let loader = this.renderer.selectRootElement('#loader');
  //   this.renderer.setStyle(loader, 'display', 'none');
  // }


  getLangData(lang="english") {
	
	if (localStorage.getItem("langData")) { this.dataService.language = JSON.parse(localStorage.getItem("langData")); return ;}

    return this.api.getReq(`/common/language/${lang}`)
    .then((res: any) => {
            if (res.status == "success"){
                    localStorage.setItem("langData",JSON.stringify(res.data));
                    this.dataService.language = res.data;
            }
            else { console.log("Something Went Wrong"); }

    })
    .catch(err => { console.log(err); });
  }

   

}
