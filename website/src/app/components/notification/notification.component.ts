import { Component, OnInit } from '@angular/core';
import { DataService } from "../../_services/data.service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  

  constructor( public dataService: DataService, private user: UserService ) {  }


  ngOnInit(): void {
	
  }

  refresh() { this.user.getNotifications(); }

}
