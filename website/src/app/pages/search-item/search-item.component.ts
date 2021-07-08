import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../_services/data.service";
import { UserService } from "../../_services/user.service";
import { HelperPipe } from "../../_helpers/help.pipe"
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  @Input() item: any;
  first: any;
  selected: any;
  block: boolean = false;

  constructor(public dataService: DataService, private user: UserService, public Helper: HelperPipe, private toastr: AlertService) { }

  ngOnInit(): void {
    this.first = [this.item.quantities[0]];
    this.selected = this.first;
  }

  wishlist(Id){

    if (!this.dataService.userData.isSignedIn) { this.toastr.error("Login required"); return; }
    if (this.block) { console.log("Blocked"); return }
    this.block = true;

    if(this.dataService.checkWishlist(Id)) {
        this.user.removeWishlist(Id).then(res => {
                if (res) { this.dataService.removeFav(Id); this.block=false; }
        });

    } else {
        this.user.addWishlist(Id).then(res => {
                if (res) { this.dataService.addToWishlist(Id); this.block=false; }
        });
    }
  }

}

