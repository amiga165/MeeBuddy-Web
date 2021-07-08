import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  fresh: any;

  @Input()
  card: any;

  constructor() { }

  ngOnInit(): void {
  }

  open() { this.fresh= true; }

  setClose(val) { this.fresh = val; }


}
