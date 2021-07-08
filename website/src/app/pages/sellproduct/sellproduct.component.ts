import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { CenterService } from "../../_services/center.service";
import { AlertService } from "../../_services/alert.service";
import { UserService } from "../../_services/user.service";
import { CommonService } from "../../_services/common.service";

@Component({
  selector: 'app-sellproduct',
  templateUrl: './sellproduct.component.html',
  styleUrls: ['./sellproduct.component.scss']
})
export class SellproductComponent implements OnInit {

  public productForm : FormGroup;
  public submitted = false;
  public imagePath;
  public imgURL: any;
  public imageData: String = "";
  public message: string;
  public prod_types: any[] = [];
  public prodData : any = {};
  public prod_data: any[] = [];

  constructor( 
    private center: CenterService, 
    public dataserv : DataService, 
    private formBuilder: FormBuilder, 
    private toastr: AlertService,
    private user : UserService,
    private common: CommonService
    ) {

    this.getProductType();
    this.getProducts();
  }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      cat_id: ['', [Validators.required, Validators.min(1)]],
      prod_title: ['', Validators.required],
      prod_desc: ['', Validators.required],
      prod_cost: ['', Validators.required],
    });
  }

  getProducts(){ 
    this.user.getUserLocalProducts().then(res => { this.prod_data = res; console.log(this.prod_data)})
  }

  preview(files) {

    if(files.length === 0){
      return;
    }

    var mimeType = files[0].type;
    if(mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (event) => {
      this.imgURL = event.target.result;
      this.imageData = this.imgURL.split(",")[1];
    }
  }

  getProductType(){
    this.center.getCategories("local-product")
    .then(res => {
      this.prod_types = res;
    })
  }

  get f() { return this.productForm.controls; }

  productSubmit(){

    this.submitted = true;

    if(this.productForm.invalid) {
      return;
    }
    else{

      this.prodData.prod_id = this.f.cat_id.value;
      this.prodData.prod_title = this.f.prod_title.value;
      this.prodData.prod_desc = this.f.prod_desc.value;
      this.prodData.prod_cost = this.f.prod_cost.value;
      this.prodData.prod_img = this.imageData;
      this.common.logoLoad = true;
      this.center.addLocalProduct(this.prodData)
      .then(res => {
        this.productForm.reset();
        this.submitted = false;
        this.imgURL = "";
        this.getProducts();
        console.log(res);
        this.common.logoLoad = false;
      })
      .catch(err => {
        this.common.logoLoad = false;
        this.toastr.error(err);
      })
    }
  
  }

}

