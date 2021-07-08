import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-floatapp",
  templateUrl: "./floatapp.component.html",
  styleUrls: ["./floatapp.component.scss"],
})
export class FloatappComponent implements OnInit {
  @Input() filtered_tags: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  getValue(val) {
    document.getElementById(val).scrollIntoView({ behavior: "smooth" });
    document.getElementById("menuInput")?.click();
  }
}
