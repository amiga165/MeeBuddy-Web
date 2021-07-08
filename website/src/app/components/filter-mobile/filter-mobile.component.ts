import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-filter-mobile",
  templateUrl: "./filter-mobile.component.html",
  styleUrls: ["./filter-mobile.component.scss"],
})
export class FilterMobileComponent implements OnInit {
  @Input() filtered_tags: any[] = [];

  public radio_val: string;
  @Output() radioEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  getValue(val) {
    console.log(val);
    document.getElementById(val).scrollIntoView({ behavior: "smooth" });
  }
}
