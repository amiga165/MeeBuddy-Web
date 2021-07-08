import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-image-popup",
  templateUrl: "./image-popup.component.html",
  styleUrls: ["./image-popup.component.scss"],
})
export class ImagePopupComponent implements OnInit {
  @Input()
  order: any;

  @Output()
  Close = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.order);
  }

  close() {
    this.Close.emit();
  }
}
