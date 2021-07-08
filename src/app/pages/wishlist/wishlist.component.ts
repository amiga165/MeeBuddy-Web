import { Component, OnInit } from '@angular/core';
import { UserService } from "../../_services/user.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  s: number = 1;
  Wcards: any[] = []

  constructor(
	private user: UserService
	) { }

  ngOnInit(): void {

	this.getFavs();
  }

  getFavs() {
        this.user.getWishlist().then(res => {
		this.Wcards = [res];
		console.log(this.Wcards);
	});
  }

  removeFav(Id) {

	this.Wcards.forEach(res => {
		res.items = res.items.filter(x => { return Id !== x._id });
	})
  }


}
