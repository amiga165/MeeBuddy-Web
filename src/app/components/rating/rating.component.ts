import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from "../../_services/user.service";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})

export class RatingComponent implements OnInit {

  rated: boolean = false;
  rateValue: any;

  @Input()
  ID: any;

  feed: any = { order_id: "", rating: null, feedback: "" }

  @Output()
  Close = new EventEmitter();

  constructor(private user: UserService) { }

  ngOnInit(): void {
    console.log(this.ID);
  }


  close() { this.Close.emit(false); }

  postFeedback() {
    if (this.ID && this.feed.rating) {
      this.feed.order_id = this.ID;
      this.feed.rating = Number(this.feed.rating);
      console.log(this.feed);
      this.user.rateOrder(this.feed).then(x => { console.log(x); this.close(); })
    }
  }

}
