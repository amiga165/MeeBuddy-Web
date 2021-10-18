import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";


let apiUrl = "https://api-testing.meebuddy.com/app/v3";
 // let apiUrl = "http://192.168.100.2:8091/app/v3";
//  let apiUrl = "http://192.168.98.203:8091/app/v3";


@Injectable()
export class APIService {
   
  private header;

  constructor(
    
    public http: HttpClient, 
    private common: CommonService
  
  ) {}
  
  getHeader(urlPath) {
    this.header = this.common.token || "Center Token" ;
    return new HttpHeaders({ "x-meebuddy-token": this.header });
  }


  getReq(urlPath) {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + urlPath, {
          headers: this.getHeader(urlPath),
        })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  postReq(urlPath, data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + urlPath, data, {
          headers: this.getHeader(urlPath),
        })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  putReq(urlPath, data) {
    return new Promise((resolve, reject) => {
      this.http
        .put(apiUrl + urlPath, data, {
          headers: this.getHeader(urlPath),
        })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  patchReq(urlPath, data) {
    return new Promise((resolve, reject) => {
      this.http
        .patch(apiUrl + urlPath, data, {
          headers: this.getHeader(urlPath),
        })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  deleteReq(urlPath) {
    return new Promise((resolve, reject) => {
      this.http
        .delete(apiUrl + urlPath, {
          headers: this.getHeader(urlPath),
        })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
