import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../_services/user.service";
import { DataService } from "../../_services/data.service";

@Component({
  selector: 'app-addressform',
  templateUrl: './addressform.component.html',
  styleUrls: ['./addressform.component.scss']
})
export class AddressformComponent implements OnInit {

  @Input()
  data: any;

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();

  @Output()
  changeAddress = new EventEmitter();

  add: boolean = false

  constructor(
  private user: UserService,
  public dataService: DataService
  ) {

  }

  ngOnInit(): void {
    if (!this.data) { 
	this.data = {name: "", mobile_num: "", address: ""}; 
	this.add = true;
     }; 
  }

  closing() { this.onClose.emit(true); }
  
  updateAddr() {

    if (this.add) {
      this.user.addAddress(this.data).then(res => {
          this.changeAddress.emit(res);
          this.closing();
         });
      }
    else {

      this.user.updateAddress(this.data).then(res => { 
        this.changeAddress.emit(res);
        this.closing();
      });
      
    }
  


  }

}
