import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  PRIMARY_OUTLET,
  RoutesRecognized,
} from "@angular/router";
import { filter, map } from "rxjs/operators";


@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.getLabels();
  }

  ngOnInit(): void {}

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
