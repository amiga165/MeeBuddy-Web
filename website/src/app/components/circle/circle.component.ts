import { Component, OnInit } from "@angular/core";
import { Renderer2, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-circle",
  templateUrl: "./circle.component.html",
  styleUrls: ["./circle.component.scss"],
})
export class CircleComponent implements OnInit {
  title = "circle";
  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: any
  ) {}

  ngOnInit() {
    const s = this.renderer2.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/circle.js";
    this.renderer2.appendChild(this._document.body, s);
  }
}
