import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { CenterService } from "../../_services/center.service";
import { DataService } from "../../_services/data.service";
import { UserService } from "../../_services/user.service";
import { Router,ActivatedRoute } from "@angular/router";
import { CommonService } from "../../_services/common.service";

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {

  serviceForm : FormGroup;
  service: string;
  regServices: any = [];
  data: any = [];
  id: any ;
  address: any;
  serviceData: any = {};
  submitted: boolean = false;
  addressId: any;
  loading: boolean = true;
  location: any = { lat: "", lon: ""};

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();


  constructor( 
	    private center:CenterService, 
	    public dataService: DataService, 
	    private user : UserService,
	    private formBuilder : FormBuilder,
	    private toastr : AlertService,
	    private route: ActivatedRoute,
	    private router: Router,
	    private common: CommonService
    ) 
    { 
	    let name = this.route.snapshot.paramMap.get('name');
      this.id = name.split("-").slice(-1)[0]; console.log(this.id);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.getFormdata();
      this.getLocation();
      this.getRegServices()
	}

  ngOnInit(): void {

    this.serviceForm = this.formBuilder.group({
      subcat_id: ['', [Validators.required, Validators.min(1)]],
      service_desc: ['', Validators.required],
      service_id: [''],
    });
 }

  getFormdata() {
      this.common.Load();
      this.center.getServiceForm(this.id)
      .then(res => {this.data = res; this.common.unLoad(); });

  }

  getRegServices(){
    this.user.getUserRegServices(this.id).then(res => {this.regServices = res; console.log(res); });
  }


  get f() { return this.serviceForm.controls; }

 

  serviceSubmit(){
    if(this.serviceForm.invalid) {
      return this.toastr.warning("Fill service details!!!");
    }
    else{
      if (!this.addressId) { this.toastr.warning("Invalid Address!!!"); return }
      this.serviceData.address_id = this.addressId;
      this.serviceData.service_id = this.f.service_id.value;
      this.serviceData.subcat_id = this.f.subcat_id.value;
      this.serviceData.service_desc = this.f.service_desc.value;
      this.serviceData.location = this.location;

      console.log(this.serviceData);
      this.center.addService(this.serviceData)
      .then(res => {
        this.serviceForm.controls['subcat_id'].reset();
        this.serviceForm.controls['service_desc'].reset();
        this.regServices.push(res);
        console.log(res);
      });
    }
  
  }

  setAddressId(addr) { this.addressId = addr; console.log(addr); }

  getLocation(){
    this.dataService.getLocationService()
    .then( resp => {
      this.location.lat = resp.lat;
      this.location.lon = resp.lon;
      console.log(resp);
    })
    .catch( err => {
      this.toastr.error(err);
    })
  }
}
