import { Component, OnInit} from "@angular/core";
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  PRIMARY_OUTLET,
  RoutesRecognized,
} from "@angular/router";
import { APIService } from "../../_services/api.service";
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
import { CommonService } from '../../_services/common.service';
import { filter, map } from "rxjs/operators";
import { RestaurantItemsComponent } from 'src/app/pages/restaurants/restaurant-items/restaurant-items.component';


@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs;
  name: any;
  url_name: any;
  category_name: RestaurantItemsComponent;

  constructor(private common:CommonService, private activatedRoute: ActivatedRoute, private apiservice: APIService,private router: Router ) {
    this.getCategorydetails();
    this.getLabels();
  }

  ngOnInit(): void {
    //this.category_name = RestaurantItemsComponent.calld();
  }

 getCategorydetails(){
    console.log("bread");
    this.name = this.activatedRoute.snapshot.paramMap.get('center-name');
    this.url_name = this.activatedRoute.snapshot.paramMap.get('url-name');
      this.apiservice.postReq("/common/get_category_by_urlname",{shop_url_name:this.url_name})
         .then((res: any)=>{
            console.log("breadcrumb_Details:"+JSON.stringify(res));
             
         })
    .catch(err => {
      //this.toastr.error(err.message);
    });


  }

  getLabels() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter((route) => route.outlet === PRIMARY_OUTLET))
      .subscribe((route) => {
        let snapshot = this.router.routerState.snapshot;
        this.breadcrumbs = [];
        let url = snapshot.url;
        let labels = url.split("/").filter((x) => !!x && x != "home");
        let fragments = "";

        if (url.includes("#")) {
          fragments = labels.pop();
        }

        if (labels.length > 0 || fragments) {
          if (fragments) {
            console.log("fragments", fragments.split("#"));
            fragments.split("#").forEach((x) => {
              if (x) {
                labels.push(x);
                console.log(x);
              }
            });
          }

          this.breadcrumbs.push({ label: "Home", link: "/home" });

          labels.forEach((x) => {
            let name = x.split("-");
            if (name.length > 1) {
              name.splice(-1, 1);
            }
            this.breadcrumbs.push({
              label: decodeURIComponent(name.join(" ")),
              link: "/" + x,
            });
          });
        }
      });
  }
}
