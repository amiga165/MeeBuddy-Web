import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.scss']
})
export class ServiceOrderComponent implements OnInit {

  @Input()
  order: any;
  

  @Output()
  Close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
	console.log(this.order);
  }

  close() { this.Close.emit(); }

}
