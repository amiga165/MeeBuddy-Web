import { Component, OnInit } from '@angular/core';
import { CenterService } from '../../_services/center.service';
import { APIService } from '../../_services/api.service';
import { AlertService } from '../../_services/alert.service';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-image-order',
  templateUrl: './image-order.component.html',
  styleUrls: ['./image-order.component.scss']
})
export class ImageOrderComponent implements OnInit {

  public imgURL: any;
  public location:any = { lat:"", lon:""}
  public orderData: any = {image: "", image_type: "medicine", chosen_delivery_time: "", address_id:"", location: this.location};
  public delivery_times: any=[];

  constructor( 
    private center : CenterService,
    private api : APIService,
    private toastr : AlertService,
    private dataService : DataService 
    ) 
    { this.getLocation(); }

  ngOnInit(): void {
    this.center.orderTimes().then( res => this.delivery_times = res);
  }

  preview(files){

    if(files.length === 0){
      return;
    }

    var mimeType = files[0].type;
    if(mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (event) => {
      this.imgURL = event.target.result;
      this.orderData.image = this.imgURL.split(",")[1];
      this.emptyImage(this.imgURL);
    }
  }

  emptyImage(url){
    document.getElementById('profile-upload').style.backgroundImage = "url(" + url + ")";
  }

  setAddressId(addr) { this.orderData.address_id = addr; console.log(addr); }

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

  orderSubmit(){
    console.log(this.orderData);
    this.api.putReq("/user/order/image", this.orderData)
    .then((res: any) => {
      if (res.status == "success") {
        console.log(res);
        this.toastr.success("Order placed successfully");
        this.orderData.image = "";
        this.orderData.chosen_delivery_time = "";
        this.emptyImage("");
      }else {
        this.toastr.error("Something error occured");
      }
		})
		.catch(err => {
      this.toastr.error(err.error.message);
      console.log(err);
		});
	}
}

