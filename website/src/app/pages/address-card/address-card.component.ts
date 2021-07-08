import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from "../../_services/user.service";
import { DataService } from "../../_services/data.service";


@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent implements OnInit {

  @Input()
  address: any;

  @Input()
  Default: any;
  
  @Input()
  partial: boolean;

 @Output() 
  selected  =  new EventEmitter();

 @Output() 
  newDefault =  new EventEmitter();

 @Output()
  editAddr = new EventEmitter();

  selectedAddr: any;
  val: any ;
  isSelected = false;

  constructor( private user: UserService, public data : DataService) {  console.log(data)}

  ngOnInit(): void {
 
  }
 
  partialEmit(ID) { this.editAddr.emit(ID); }

  select(ID) { this.isSelected = true; }

  close(val) { this.isSelected = false; }


  delete(ID) {

	this.user.deleteAddress(ID).then(res => { if (res) { this.selected.emit(ID); console.log("Emitting"); } } );
  }

  default(ID) {
	this.user.defaultAddress(ID).then(x => {
		if (x) { this.newDefault.emit(ID); }
	});
  }

}
