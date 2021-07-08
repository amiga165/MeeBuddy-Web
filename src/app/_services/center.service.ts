import { Injectable } from '@angular/core';
import { APIService } from "./api.service";
import { AlertService } from "../_services/alert.service";
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class CenterService {
        centerid:any;
        constructor(
                private api: APIService, 
                private toastr: AlertService
	) {

  this.getCenterId();
    // console.log('center idddd'+this.centerid);  

   }

  checkCenter() {

        return this.api.postReq("/center/status", {})
        .then((res: any) => {
                if (res.status == "success"){
                        return res.data
                }
                else { this.toastr.error("Something Went Wrong"); }

        })
        .catch(err => { console.log(err); });

  }



  getCenter() {

	return this.api.postReq("/center", {})
        .then((res: any) => {
                if (res.status == "success"){
                  console.log("center data", res);
                  
			return res.data

                }
                else { this.toastr.error("Something Went Wrong"); }

        })
        .catch(err => { console.log(err); });

  }

  getCenterId(){
         this.api.postReq("/common/centerid", {})
            .then((res: any) => { 
              console.log('comssdsdsd  '+res.data);
             this.centerid=res.data;
               //     console.log('center id common rounte'+res)
                }).catch(err=>{
                 this.centerid='';
            })
            

   
      }

  
  getCategories(type, limit=null) {
	
	let data = limit ? { "limit": limit } : {};
	
        return this.api.postReq(`/center/${type}/categories`, data)
        .then((res: any) => {
                if (res.status == "success"){
                       return res.data;
                }
                else { this.toastr.error("Something Went Wrong"); }

        })
        .catch(err => { console.log(err); });

  }


  getSubCategories(type,parent) {
	
        return this.api.postReq(`/center/${type}/categories`, {"parent_id":parent})
        .then((res: any) => {
                if (res.status == "success"){
                        console.log(res.data);return res.data
                }
                else { this.toastr.error("Something Went Wrong"); }

        })
        .catch(err => { console.log(err); });

  }
  

  getShopSubCategories(type,center_name, url_name) {
    
    let data = {
      center_name: center_name,
      url_name: url_name,
      parent_id: true
    }

    return this.api.postReq(`/center/${type}/sub-categories`, data)
    .then((res: any) => {
            if (res.status == "success"){
                    console.log(res.data);return res.data
            }
            else { this.toastr.error("Something Went Wrong"); }

    })
    .catch(err => { console.log(err); });

}



  getItems(type,category) {

        return this.api.postReq(`/center/${type}/items`, {"category_id": category, "limit": "200"})
        .then((res: any) => {
                if (res.status == "success"){
                        console.log(res.data);return res.data
                }
                else { this.toastr.error("Something Went Wrong"); }

        })
        .catch(err => { console.log(err); });

  }

  getShopItems(type,center_name, url_name) {

    let data = {
      center_name: center_name,
      url_name: url_name
    }

    return this.api.postReq(`/common/category-items`, data)
    .then((res: any) => {
            if (res.status == "success"){
                    console.log("xooooooo",res.data);return res.data
            }
            else { this.toastr.error("Something Went Wrong"); }

    })
    .catch(err => { console.log(err); });

}

  getServiceForm(Id){
	return this.api.postReq("/center/service/details", {"service_id": Id})
        .then((res: any) => {
                if (res.status == "success"){
			return res.data;
                }
                else { this.toastr.error("Something Went Wrong"); }

        })
        .catch(err => { console.log(err); });	
  }

  addLocalProduct(prodData){

        return this.api.putReq("/center/local-product/new", {

                "category_id" : prodData.prod_id,
                "product_title" : prodData.prod_title,
                "description" : prodData.prod_desc,
                "product_cost" : prodData.prod_cost,
                "product_image" : prodData.prod_img,
        })
        .then((res: any) => {
                if(res.status == "success"){
                        this.toastr.success("Product successfully added!");
                        return res.data;
                }
                else{ this.toastr.error("Something Went Wrong");}
        })
        .catch(err => { 
                if(err.error.status == "error"){
                        this.toastr.error(err.error.message);
                }
        });
  }

  // service add

  addService(serviceData){

        return this.api.putReq("/user/order/service", {

                "address_id" : serviceData.address_id,
                "service_id" : serviceData.service_id,
                "sub_category" : serviceData.subcat_id,
                "description" : serviceData.service_desc,
                "location" : serviceData.location
        })
        .then((res: any) => {
                if(res.status == "success"){
                        swal("Good job!","Service Successfully Added!", "success");
                        return res.data;
                }
                else{ this.toastr.error("Something Went Wrong");}
        })
        .catch(err => { 
                console.log(err);
        });
  }

// Search Apis 


  searchCategories() {
    return this.api.postReq("/center/shopping/category/search", {})
    .then((res:any) => {
      if(res.status == "success"){
	console.log(res.data);
        return res.data;
      }
      else{
        console.log("-_-");
      }
    })
    .catch((err) => {console.log(err)});
  }


  searchItem(val) {
    return this.api.postReq("/center/shopping/search", { "query" : val })
    .then((res:any) => {
      if(res.status == "success"){
	console.log(res.data);
        return res.data;
      }
      else{
        console.log("-_-");
      }
    })
    .catch((err) => {console.log(err)});
  }
 
// Timing Apis 

  orderTimes() {
    return this.api.postReq("/center/timings/order", {})
    .then((res:any) => {
      if(res.status == "success"){
        return res.data;
      }
      else{
        console.log("-_-");
      }
    })
    .catch((err) => {console.log(err)});
  }

  sellTimes() {
    return this.api.postReq("/center/timings/local-products", {})
    .then((res:any) => {
      if(res.status == "success"){
        return res.data;
      }
      else{
        console.log("-_-");
      }
    })
    .catch((err) => {console.log(err)});
  }


}
