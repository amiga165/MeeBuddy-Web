import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.scss']
})
export class SuccessStoriesComponent implements OnInit {
public url:any;
  constructor() { }

  ngOnInit(): void {
  }
  
enlargeimage(url)
{
this.url=url;
}

}