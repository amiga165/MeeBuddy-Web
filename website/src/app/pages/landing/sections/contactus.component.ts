import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { APIService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
})
export class ContactusComponent implements OnInit {

  focus : boolean;
  focus1: boolean;
  focus2: boolean;
  focus3: boolean;

  formData:any = {}

  constructor(
    private api: APIService,
    private toastr: AlertService 
  ) {}

  ngOnInit(): void {
  }

  contactUs(){
    this.formData["from"] = "default";

    this.api.postReq("/common/contact-us", this.formData)
      .then( (res:any) => {
        if (res.status == "success")
          this.toastr.success("Sent request successfully")
          this.formData = {}
    
      })
      .catch( (err) => {
        // console.log('loooo',err);
        
        this.toastr.error("Something went wrong");
      })
  }

}
