import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { APIService } from 'src/app/_services/api.service';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-joinus',
  templateUrl: './joinus.component.html',
})

export class JoinusComponent implements OnInit {

  Jcards:any[] = [];
  formData: any = {};
  
  constructor(
    private common: CommonService,
    private toastr: AlertService,
    private api: APIService
  ) {
    this.formData.join_as = "Franchise manager";
   }

  ngOnInit(): void {
  }


  formSubmit(){
    
    this.formData["from"] = "default";

    this.api.postReq("/common/join-us", this.formData)
      .then((res:any) => {
          
          
          if(res.status == "success")
            this.toastr.success("Sent join request successfully")

          this.formData = {}
       
      })
      .catch((err:any) => {
        this.toastr.error("Something went wrong")
      })
    
  }

}
