import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from "../../../_services/api.service";
import { CenterService } from "../../../_services/center.service";
import { AlertService } from "../../../_services/alert.service";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-localproduct-items',
  templateUrl: './localproduct-items.component.html',
  styleUrls: ['./localproduct-items.component.scss']
})
export class LocalproductItemsComponent implements OnInit {

  modalRef: NgbModalRef;
  public id: string;
  public name: string;
  public cat_name: string;
  public localproducts: any = [];
  public delivery_times: any = [];
  public productData: any = { product_id: "", chosen_delivery_time: 0, preffered_payment: "cod", address_id: ""};

  constructor( 
    private route: ActivatedRoute, 
    private center : CenterService,
    private modalService: NgbModal, 
    private api : APIService,
    private toastr : AlertService,
   ) { }

  ngOnInit(): void {
    this.getItems();
    this.center.sellTimes().then(res => {
      this.delivery_times = res;
      this.productData.chosen_delivery_time = this.delivery_times[0].timestamp;
    });
  }

  getItems(){

    this.name = this.route.snapshot.paramMap.get('name');
    this.id = this.name.split("-").slice(-1)[0];
    this.center.getItems("local-product", this.id)
    .then(res => {
      this.localproducts = res;
      console.log(this.localproducts);
    });

  }
  
  open(targetModal, catName, prod){
    this.modalRef = this.modalService.open(targetModal, {
     centered: true,
     backdrop: "static",
     size: 'lg',
     keyboard: false
   });
   document.getElementById('catname').textContent = catName;
   document.getElementById('prodname').textContent = prod.name;
   document.getElementById('prodamount').textContent = prod.amount;
   this.productData.product_id = prod._id;
  }

  closeModal(){
    this.productData.product_id = "";
    this.productData.address_id = "";
    this.modalRef.close();
  }
  
  submitData(){
    console.log(this.productData);
    this.api.putReq("/user/order/local-product", this.productData)
    .then((res: any) => {
      if (res.status == "success") {
        this.toastr.success("Product order placed successfully");
        this.closeModal();
      }
      else {
        this.toastr.error("Something error occured");
      }
    })
    .catch(err => {
      this.toastr.error(err.message);
    });
  }

  setAddressId(addr) { this.productData.address_id = addr; console.log(addr); }

}

