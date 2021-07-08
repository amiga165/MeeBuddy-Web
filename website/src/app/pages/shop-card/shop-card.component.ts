import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss']
})
export class ShopCardComponent implements OnInit {

  @Input()
  data: any;
 
  @Input()
  link: any;

  constructor() { }

  ngOnInit(): void {
	// console.log('data'+this.link, this.data);
  }

}
