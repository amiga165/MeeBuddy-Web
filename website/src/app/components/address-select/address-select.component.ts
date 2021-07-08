import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UserService } from "../../_services/user.service";
import { DataService } from "../../_services/data.service";

@Component({
  selector: "app-address-select",
  templateUrl: "./address-select.component.html",
  styleUrls: ["./address-select.component.scss"],
})
export class AddressSelectComponent implements OnInit {
  AddressDet: any[] = [];
  defAddr: any;
  selectedAddress: any;
  canShow: boolean = false;
  shippingAddr: any;
  edit: boolean = false;

  @Output()
  address: any = new EventEmitter();

  constructor(private user: UserService, public dataService: DataService) {
    this.reset();
    this.getAddr();
  }

  ngOnInit(): void {}

  reset() {
    this.shippingAddr = {
      name: this.dataService.userData.info.name,
      mobile_num: this.dataService.userData.info.mobile_num,
      address: "",
    };
  }

  getAddr() {
 
    this.user.savedAddress().then((res) => {
      this.defAddr = res.default;
      this.address.emit(this.defAddr);
      this.AddressDet = res.addresses;
      if (!this.AddressDet.length) {
        this.action(true);
      }
      this.selectedAddress = this.AddressDet.filter((x) => {
        return x._id == this.defAddr;
      })[0];
      console.log(this.defAddr, this.selectedAddress);
    });
		this.shippingAddr = { 
			name: this.dataService.userData.info.name, 
			mobile_num: this.dataService.userData.info.mobile_num, 
			address: ""
		};
	}


  deleteAddr(ID) {
    this.AddressDet = this.AddressDet.filter((x) => {
      return x._id != ID;
    });
  }

  setDefault(newAddr) {
    this.defAddr = newAddr;
  }


  action(val) { this.canShow = val; this.edit = false; this.reset(); }
  
  editFunc(ID) { 

		this.edit = true; 
		this.canShow = true; 
		this.shippingAddr = this.AddressDet.filter(x => {return x._id == ID})[0];

	 }  


  chooseAddr() {
    let value = (<HTMLInputElement>(
      document.querySelector('input[name="selectAddr"]:checked')
    ))?.value;
    this.selectedAddress = this.AddressDet.filter((x) => {
      return x._id == value;
    })[0];
    this.address.emit(this.selectedAddress._id);
  }

  proceed() {
    if (this.canShow) {
      if (this.edit) {
        let data = [this.selectedAddress].map((x) => {
          x["address_id"] = x["_id"];
        });
        this.user.updateAddress(this.selectedAddress).then((res) => {
          console.log(res);
          this.address.emit(res._id);
          console.log("Edited");
        });
      } else {
        this.user.addAddress(this.shippingAddr).then((res) => {
          this.AddressDet.push(res);
          this.selectedAddress = res;
          console.log(res);
          this.address.emit(res._id);
          console.log("Added");
        });
      }
      console.log(this.shippingAddr);
    } else {
      this.chooseAddr();
      console.log(this.selectedAddress);
    }

	let value = (<HTMLInputElement>document.querySelector('input[name="selectAddr"]:checked'))?.value;
	this.selectedAddress = this.AddressDet.filter(x => {return x._id == value})[0];
	this.address.emit(this.selectedAddress._id);

	}

}
