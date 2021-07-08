import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {

  open: boolean = false;
  word: string = "";
  @Output()
  searchTerm = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.open = !this.open;
    let input = document.getElementById("search");
    let button = document.getElementById("button");

    if (this.open) {
      input.classList.add("active");
      button.classList.add("animate");
    }
    else {
      input.classList.remove("active");
      button.classList.remove("animate");
    }

  }

  search(e) {
    this.word = e.target.value;
    this.searchTerm.emit(this.word);
  }

}

