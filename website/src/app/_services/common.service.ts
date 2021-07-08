import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public logoLoad: boolean = false;
  public token: any;
  
  constructor( 
   

    ) {   

    this.token = localStorage.getItem("apiToken") || "Wrong Token";

  }
  
  Load() { this.logoLoad = true; }
  unLoad() { this.logoLoad = false; }

  

  setToken(token) { this.token = token ; localStorage.setItem("apiToken", token); console.log('wewe'+token);}

}
