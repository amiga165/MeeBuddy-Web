import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Serve } from "../../../constants/";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  status : boolean = false;
  products: any[] = [];
  sub: any[] = [];
  p: number = 1;
  name: string = "";

  constructor() { }

  ngOnInit(): void {
	this.name = this.route.snapshot.paramMap.get('name');
	this.products = Serve;
  }

}
