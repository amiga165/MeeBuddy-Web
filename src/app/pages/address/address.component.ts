import { Component, OnInit } from '@angular/core';
import { UserService } from "../../_services/user.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  AddressDet:any[] = [];
  defAddr: any ;
  constructor(
	private user: UserService
	) {
		this.getAddr();
	}

  ngOnInit(): void {

  }

  getAddr() {
	this.user.savedAddress().then(res => {this.defAddr = res.default; this.AddressDet = res.addresses; console.log(this.defAddr);});
  }

  deleteAddr(ID) {
	this.AddressDet	= this.AddressDet.filter(x => {return x._id != ID});
  }

  setDefault(newAddr) { this.defAddr =  newAddr; }
}
