import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
   styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  cards: any[] = [

        {
                title:"From Restaurant",
                link: "/restaurants",
                description:"We offer delivery of all your favorite food items from the local restaurants. Order right away!",
                button: "Place quick order"
        },

        {
                title:"From Store to Door",
                link:"/shopping",
                description: "Why go to the store and when we can get it to you? Just three simple steps: Browse through our e-aisles. Add to the cart. Order it.",
                button: "Place quick order"
        },
        {
                title:"Home Services",
                link:"/services",
                description:"Doing the chores is not everyone's strong suit, so why not take our help? Order help for your laundry, plumbing, electrical and other issues.",
                button: "Checkout more"
        },

        {
                title:"From the Farm",
                link:"/shopping",
                description: "Don't settle for anything unhealthy. Order organic farm-fresh vegetables, eggs, dairy products, and many more here at MeeBuddy.",
                button: "Place quick order"
        },
        {
                title:"Trade It Up",
                link:"/local-product",
                description: "Put a price on your old furniture and sell it here! You can also buy second-hand products here.",
                button: "Checkout more"
        }
        // },
        
        // {
        //         title:"MeeBuddy Auto",
        //         link:"/home",
        //         description:"Laundry unfinished, see a broken pipe or your AC needs services. Wide range of services offered by MeeBuddy.",
        //         button: "Checkout more"
        // }

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
