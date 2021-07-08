import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CenterService } from "../../_services/center.service";
import { CommonService } from "../../_services/common.service";
import { HelperPipe } from "../../_helpers/help.pipe"

@Component({
  selector: 'app-servicepage',
  templateUrl: './servicepage.component.html',
  styleUrls: ['./servicepage.component.scss']
})
export class ServicepageComponent implements OnInit {

  status : boolean = false;
  products: any[] = [];
  sub: any[] = [];
  p: number = 1;
  name: string = "";
  loading: boolean = true;
  proceed: boolean = false;
  serviceInfo : any;
  maxSize: number = 5;

  constructor(private center: CenterService, private common: CommonService, private PIPE:HelperPipe) { }

  ngOnInit(): void {

	this.getServices();
  }

    getServices(){

    this.center.getCategories("service").
	then(res => {
		console.log(res);
		this.products = res;
		this.loading = false;
	});
    }

  getServiceInfo(Id) {
	this.center.getServiceForm(Id).then(res => {
		this.serviceInfo = res;
		this.proceed = true;
	});
  }


  stop(val) { this.proceed = val; console.log("called"); }
}
