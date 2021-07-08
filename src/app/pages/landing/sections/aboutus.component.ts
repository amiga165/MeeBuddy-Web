import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../_services/data.service";
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html'
})
export class AboutusComponent implements OnInit {

  constructor(public dataService:DataService) { }

  ngOnInit(): void {
  }

}
