import { Component, OnInit } from '@angular/core';
import { DataService } from "../../_services/data.service";
import { UserService } from "../../_services/user.service";


@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss']
})
export class NotificationPageComponent implements OnInit {

  constructor( public dataService: DataService, private user: UserService ) {  }


  ngOnInit(): void {
    console.log(this.dataService.notifications);
  }

  refresh() { this.user.getNotifications(); }


}
