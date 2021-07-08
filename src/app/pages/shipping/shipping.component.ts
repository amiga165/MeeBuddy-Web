import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from "../../_services/user.service";
import { DataService } from "../../_services/data.service";
import { AlertService } from "../../_services/alert.service";
import { add } from 'ngx-bootstrap/chronos';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  @Output()
  value = new EventEmitter();

  @Output()
  data = new EventEmitter();

  @Input()
  stage: number ;

  editable: boolean = false;
  step: number ;
  @Output()
  address: any;
  @Output()
  shippingAddr: any;
  editaddress: any;
  isSelected: boolean = false;
  defAddr: any;   
  selected: any;

  constructor(
	private user:UserService,
	public dataService: DataService,
	private toastr: AlertService
	) { 
    
}

  ngOnInit(): void {
    this.getData();
  }

  close(val) { this.isSelected = false; this.editaddress = undefined; }

  addressChange(addr) { 
		let check = true;
		this.address.some((x,i) => {
			if (x._id === addr._id) { this.address[i] = addr;check = false }
		 });
		if (check) { this.address.unshift(addr); this.defAddr = addr._id; }

    this.getData();

	 }

   hasDefault(addresses, address_id){
     let result = addresses.filter(address =>address._id === address_id)
     console.log("resuu", result)
     if(result.length && result[0]._id == address_id) 
      return true
    else
     return false

   }
 
  getData() {
  this.defAddr = undefined;
	this.user.savedAddress().then(res => {
    this.address = res.addresses; 
    
    console.log("boool", this.hasDefault(this.address, res.default));
    
    if (res.default && this.hasDefault(this.address, res.default) ){
      
      this.defAddr = res.default; 
    } 
    
  }).then( _=> {
    
    this.selected = this.address[0]._id;
    
    console.log("defffff",this.defAddr);
    
    if (this.defAddr){ 
      this.selected = this.defAddr;
    }
    this.shippingAddr = this.selected;
    this.data.emit(this.shippingAddr)
   
  })

  }

  next() { 
    
    if (this.shippingAddr){
      this.value.emit(this.stage+1);
    }
    else{
      this.toastr.error("Choose Address");
      return
    }


	// let Radio= (<HTMLInputElement>document.querySelector('input[name="selector"]:checked')).value;

	// if (Radio) { 

	// 	console.log(Radio); this.data.emit(Radio); 
/*		if (Radio === "newAddress") { 

			this.data.emit(res._id); this.value.emit(this.stage+1);
			console.log(this.shippingAddr); 
			this.user.addAddress(this.shippingAddr).then(res => {
				console.log(res); this.data.emit(res._id); this.value.emit(this.stage+1);
			});  
		}

		else { console.log(Radio); this.data.emit(Radio); this.value.emit(this.stage+1); } */

  }

  back() { 
	this.value.emit(this.stage-1);
  }

  selAddress(address_id){
    this.selected = address_id
    this.shippingAddr = address_id;
    this.data.emit(this.shippingAddr)
    
  } 

  editAddress(edit_addr=null){
    
    
    this.isSelected = true;
    if (edit_addr){
	    this.editaddress = { address_id: edit_addr._id, name: edit_addr.name, address: edit_addr.address, mobile_num: edit_addr.mobile_num }
    }
  }



  updateAddress(){
    console.log(this.editaddress);
    this.user.updateAddress(this.editaddress)
    .then(res => {
      this.editable = false;
      this.getData();
    })
    .catch( err => {
      this.toastr.error("Something went wrong")
    })
  }

  deleteAddress(id){
    this.user.deleteAddress(id)
    .then(res => {
      if(res){
        this.toastr.success("Address deleted successfully!");
        this.getData();
      }
    })
    .catch( err => {
      this.toastr.error("Something went wrong")
    })
  }

  setDefaultAddress(id){
    this.user.defaultAddress(id)
    .then(res => {
      if(res){
        this.toastr.success("Address set to default")
        this.getData();
      }
    })
    .catch(err => {
      this.toastr.error("Something went wrong")
    })
  }

  cancelEdit(){
    this.editable = false;
  }


}

