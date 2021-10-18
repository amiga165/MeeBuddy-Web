import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AlertService } from "../_services/alert.service";
import { APIService } from "./api.service";
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    
   constructor(
           
        private toastr: AlertService,
        private api : APIService,
        private router : Router
        
        ) { }


// USER APIs 

   getUser(){
        
        return this.api.postReq("/user",{})
        .then((res: any) => {
        if (res.status == "success"){
            return res.data
                }
                else { console.log("-_-"); }

        })
        .catch(err => { console.log(err); });
   }

   updateUser(details){

        return this.api.patchReq("/user", details)
                .then((res: any) => {
                if (res.status == "success"){
                        console.log(res);
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
//                              this.auth.logout();
                        }
                });
   }


// Address APIs

   savedAddress(){

        return this.api.postReq("/user/address", {})
                .then((res: any) => {
                if (res.status == "success"){
                        console.log(res);
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => { console.log(err); });
   }

   addAddress(details){

        return this.api.putReq("/user/address/add", details)
                .then((res: any) => {
                if (res.status == "success"){
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => { console.log(err); });
   }

   updateAddress(details){

        return this.api.patchReq("/user/address", details)
                .then((res: any) => {
                if (res.status == "success"){
                        console.log(res);
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => { console.log(err); });
   }

   defaultAddress(ID){

        return this.api.patchReq("/user/address/default", {"address_id": ID})
                .then((res: any) => {
                if (res.status == "success"){
                        console.log(res);
                        return true;
                }
                else { console.log("-_-"); }

                })
                .catch(err => { console.log(err); });
   }

   deleteAddress(Id){

        return this.api.postReq("/user/address/remove", {"address_id": Id})
                .then((res: any) => {
                if (res.status == "success"){
                        return true;
                }
                else { console.log("-_-"); }

                })
                .catch(err => { console.log(err); });
   }



//Wishlist APIs

  getWishlistIds() {

        return this.api.postReq("/user/wishlist/",{})
                .then((res: any) => {
                if (res.status == "success"){
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
//                                this.auth.logout();
                        }
                });

  }

  getWishlist() {

        return this.api.postReq("/user/wishlist/list",{})
                .then((res: any) => {
                if (res.status == "success"){
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
//                                this.auth.logout();
                        }
                });

  }

  addWishlist(Id) {

        return this.api.patchReq("/user/wishlist/add",{"item_id": Id})
                .then((res: any) => {
                if (res.status == "success"){
            this.toastr.success("Item added to wishlist");
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
                                console.log(err);
//                                this.auth.logout();
                        }
                });

  }


  removeWishlist(Id) {

        return this.api.patchReq("/user/wishlist/remove",{"item_id": Id})
                .then((res: any) => {
                if (res.status == "success"){
            this.toastr.success("Item removed from wishlist");
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
                console.log(err);
//                                this.auth.logout();
                        }
                });

  }


// CART APIs

  getCartCats() {

        return this.api.postReq("/user/cart/categories",{})
                .then((res: any) => {
                if (res.status == "success"){
                        // console.log(res.data);
                        return res.data;
                }
                else { console.log("Something went Wrong"); }

                })
                .catch(err => {
                        if (err.status === 403) {
                                console.log(err);

                        }
                });

  }

  deleteCartCats(data) {

        return this.api.postReq("/user/cart/delete/category",data)
                .then((res: any) => {
                if (res.status == "success"){
                        console.log(res.data);
                        return res.data;
                }
                else { console.log("Something went Wrong"); }

                })
                .catch(err => {
                        if (err.status === 403) {
                                console.log(err);

                        }
                });

  }

  getCartList() {

        return this.api.postReq("/user/cart/list",{})
                .then((res: any) => {
                if (res.status == "success"){
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
//                                this.auth.logout();
                        }
                });

  }




  addToCart(data) {

        return this.api.putReq("/user/cart/",data)
                .then((res: any) => {
                if (res.status == "success"){
            console.log(res);
            return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
                                console.log(err);
//                                this.auth.logout();
                        }
                });

  }
 
  cartIncrement(ID) {

        return this.api.patchReq("/user/cart/increment",{"cart_item_id": ID})
                .then((res: any) => {
                if (res.status == "success"){
                        return true;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
                                console.log(err);
//                                this.auth.logout();
                        }
                });

  }

  cartDecrement(ID) {

        return this.api.patchReq("/user/cart/decrement",{"cart_item_id": ID})
                .then((res: any) => {
                if (res.status == "success"){
                        return true;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
                                console.log(err);
//                                this.auth.logout();
                        }
                });

  }



  removeCartItem(ID) {

        return this.api.postReq("/user/cart/delete",{"cart_item_id": ID})
                .then((res: any) => {
                if (res.status == "success"){
            this.toastr.success("Item Removed");
//          this.dataService.removeCart(ID);
                        return true;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
                                console.log(err);
//                                this.auth.logout();
                        }
                });

  }

  clearCartItems() {

        return this.api.deleteReq("/user/cart")
                .then((res: any) => {
                if (res.status == "success"){
            return true;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
                                console.log(err);
                        }
                });

  }

  orderCharges(data) {

        return this.api.postReq("/user/order/checkout", data)
                .then((res: any) => {
                if (res.status == "success"){
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
                                console.log(err);
                        }
                });

  }

  // Order Routes

  placeOrder(method, data) {

        return this.api.putReq("/user/order/regular/" + method , data)
                .then((res: any) => {
                if (res.status == "success"){
            console.log(res.data);
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
                                this.toastr.error(err.error.message);
                        }
                });

  }


  getOrders() {

        return this.api.postReq("/user/orders/regular", {})
                .then((res: any) => {
                if (res.status == "success"){
                        console.log(res.data);
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                        if (err.status === 403) {
                                console.log(err);
                        }
                });

  }

   getOrderItems(data) {

        return this.api.postReq("/user/order/track", data)
                .then((res: any) => {
                if (res.status == "success"){
                        console.log(res.data);
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
        console.log(err);
                });

    
   }

   getImageOrders() {

        return this.api.postReq("/user/orders/image", {})
                .then((res: any) => {
                if (res.status == "success"){
                        console.log(res.data);
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                console.log(err);
                });

   }

   cancelOrder(data) {

        return this.api.postReq("/user/order/cancel", data)
                .then((res: any) => {
                if (res.status == "success"){
                        console.log(res.data);
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                console.log(err);
                });


   }

   rateOrder(data) {

        return this.api.patchReq("/user/order/rating", data)
                .then((res: any) => {
                if (res.status == "success"){
                        console.log(res.data);
                        return res.data;
                }
                else { console.log("-_-"); }

                })
                .catch(err => {
                console.log(err);
                });


   }


// Notifications 

  getNotifications(){
        return this.api.postReq("/user/notifications", {})
                .then((res:any) => {
                if(res.status == "success"){
            return res.data;
                }
                else{ console.log("-_-");}

                })
                .catch(err => {
                        console.log(err);
                });
  }



  // get user local products

  getUserLocalProducts(){
        return this.api.postReq("/user/local-products", {})
                .then((res:any) => {
                if(res.status == "success"){
                        return res.data;
                }
                else{ console.log("-_-");}

                })
                .catch(err => {
                        console.log(err);
                });
  }

  // get user reg services

  getUserRegServices(s_id){
        return this.api.postReq("/user/service/registrations", {"service_id": s_id})
                .then((res:any) => {
                if(res.status == "success"){
                        return res.data;
                }
                else{ console.log("-_-");}
                })
                .catch( err => {
                        console.log(err);
                });
  }

  getOrderServices(data){
        return this.api.postReq("/user/orders/services", data)
                .then((res:any) => {
                if(res.status == "success"){
                        return res.data;
                }
                else{ console.log("-_-");}
                }) 
                .catch( err => {
                        console.log(err);
                });
  }

//payment routes

deleteOrder(order_id, error) {
        return this.api
                .postReq("/user/order/delete", {order_id, error})
                .then((res: any) => {
                        if (res.status == "success") {
                                return true;
                        } else {
                                this.toastr.error("Something error occured");
                        }
                })
                .catch(err => {
                        swal({
                                title: "Something error occured!",
                                text: "Please check the orders, reorder them.",
                                icon: "error",
                        }).then(OK => {
                                if(OK) {this.router.navigate(["/home"]);}
                        })
                });
}


paymentVerify(data) {
        console.log("Data",data);
        return this.api
                .postReq("/user/order/verify", data)
                .then((res: any) => {
                        if (res.status == "success") {
                                console.log(res);
                                return true;
                        } else {
                                this.toastr.error("Something error occured");
                        }
                })
                .catch(err => {
                        swal({
                                title: "Something error occured!",
                                text: "Please check the orders, reorder them.",
                                icon: "error",
                        }).then(OK => {
                                if(OK) {this.router.navigate(["/home"]);}
                        })
                });
}

// Wallet Routes

  addToWallet(amount){
          return this.api.putReq("/user/wallet/add", {"amount" : amount})
                .then((res:any) => {
                if (res.status == "success"){
                        return res.data
                }
                else{ console.log("-_-");}

                })
                .catch(err => {
                        if(err.status == 403){
                                this.toastr.error(err.error.message);
                        }
                        else{
                                this.toastr.error("Invalid amount!");
                        }
                 })
  }

  getwalletTransactions(){
        return this.api.postReq("/user/wallet/transactions", {})
        .then((res:any) => {
        if (res.status == "success"){
                return res.data
        }
        else{ console.log("-_-");}

        })
        .catch(err => { console.log(err); })
  }

  addWallet(data) {
                console.log(data);
               return this.api
                        .postReq("/user/wallet/verify", data)
                        .then((res: any) => {
                                if (res.status == "success") {
                    console.log(data,res.data);
                                        this.toastr.success("Amount added succesfully");
                    return true;
                                        
                                } else {
                                        this.toastr.error("Something error occured");
                                }
                        })
                        .catch(err => {
                                this.toastr.error(err.message);
                        });
        }
        
deleteTransaction(wallet_id) {
        return this.api
                .postReq("/user/wallet/delete", { wallet_id })
                .then((res: any) => {
                        if (res.status == "success") {
                                console.log("Deleted");
                                return true;
                        } else {
                                this.toastr.error("Something error occured");
                        }
                })
                .catch(err => {
                        this.toastr.error(err.message);
                });
}



}
