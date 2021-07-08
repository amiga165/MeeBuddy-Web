import { Component, OnInit } from '@angular/core';
import { DataService } from "../../_services/data.service";
import { HelperPipe } from "../../_helpers/help.pipe"

@Component({
  selector: 'app-supermenu',
  templateUrl: './supermenu.component.html',
  styleUrls: ['./supermenu.component.scss']
})
export class SupermenuComponent implements OnInit {

  constructor(public dataService: DataService, private PIPE: HelperPipe) { }

  ngOnInit(): void {
  }

  canShow() { return document.querySelector('input[id="menu-btn"]:checked') ? true : false; }

  close() { document.getElementById("close-btn")?.click(); }

  chunk(arr) {

    if (arr) {
      let chunkSize = Math.ceil(arr.length / 4);
      if (arr.length > 28) { arr = arr.slice(0, 28); }
      return arr.reduce((prev, cur, index) => (index % chunkSize) ? prev : prev.concat([arr.slice(index, index + chunkSize)]), []);
    }
    return [];
  }

}
