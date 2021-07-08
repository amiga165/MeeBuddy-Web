import { Component, OnInit } from '@angular/core';
import { CenterService } from '../../_services/center.service';
import { APIService } from '../../_services/api.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  public allDonations: any = [];
  public donationData: any = { donation : "", address_id : ""};
  constructor(
    private center : CenterService,
    private api : APIService,
    private toastr : AlertService
  ) { }

  ngOnInit(): void {
//    this.donationsLoad();
  }

  donationSubmit(){
    console.log(this.donationData);
    this.api.putReq("/user/donate", this.donationData)
    .then((res: any) => {
      if (res.status == "success") {
        this.toastr.success("Donation placed successfully");
//        this.donationsLoad();
      }
      else {
        this.toastr.error("Something error occured");
      }
    })
    .catch(err => {
      this.toastr.error(err.message);
    });
  }

/*
  donationsLoad(){
    this.center.getDonations().then(res => {this.allDonations = res; console.log(res)});
  }  */

  setAddressId(addr) { this.donationData.address_id = addr; console.log(addr); }

}

