import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public guestCart: any;
  public total: any;

  constructor() {
    this.total = 0;
    this.initCart();	
  }
  
  checkDup(Id) {
    return this.guestCart.items.filter(x => x.quantity === Id)[0];
  }

  add2cart(item) {
    if (!this.checkDup(item._id)) {
      this.guestCart.items.push(item);
      console.log(this.guestCart.items);
      this.calcCost();
      this.save();
    }
  }

  calcCost(){
    this.total = this.guestCart.items.reduce((acc, item) => acc+= item.count * item.product.quantities.filter(x => x._id === item.quantity)[0].product_cost, 0);
  }

  initCart() {
    if (localStorage.getItem('guestCart')) {
      this.guestCart = JSON.parse(localStorage.getItem('guestCart'));
      this.calcCost();
    }
    else { this.guestCart = { items:[] }}
  }
  
  removeCart(Id) {
    this.guestCart.items = this.guestCart.items.filter(x => { return x.quantity !== Id });
    this.calcCost();
    this.save();
  }

  incrementCartItem(Id) {
    this.guestCart.items.filter(x => x.quantity === Id)[0].count += 1;
    this.calcCost();
    this.save()
  }

  decrementCartItem(Id) {
    this.guestCart.items.filter(x => x.quantity === Id)[0].count -= 1;
    this.calcCost();
    this.save();
  }

  save() {
    localStorage.setItem("guestCart",JSON.stringify(this.guestCart));
  }

}
