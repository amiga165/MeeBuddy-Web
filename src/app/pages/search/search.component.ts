import { Component, OnInit } from '@angular/core';
import { APIService } from '../../_services/api.service';
//import { CommonService } from "";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchWord: string = "";
  public searchResults: any = [];
  public loading: boolean = false;
  checked: boolean = false;

  constructor( private api: APIService) { }

  ngOnInit(): void {}

  getItems(){
    let val = this.searchWord;
    if( val.length < 3) return null;
    this.loading = true;
    this.api.postReq("/center/shopping/search", { "query" : val })
    .then((res:any) => {
      if(res.status == "success"){
        this.searchResults = res.data;
        console.log(this.searchResults);
        this.loading = false;
        this.checked = true;
      }
      else{
        console.log("-_-");
      }
    })
    .catch((err) => {console.log(err)});
  }
}

