import { Component} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  constructor() { }

  slides = [
    { img : "/assets/img/meebuddy/slider/1.png"},
    { img : "/assets/img/meebuddy/slider/2.png"},
    { img : "/assets/img/meebuddy/slider/3.png"},
    { img : "/assets/img/meebuddy/slider/4.png"},
    { img : "/assets/img/meebuddy/slider/5.png"},
    { img : "/assets/img/meebuddy/slider/6.png"},
    { img : "/assets/img/meebuddy/slider/7.png"},
    { img : "/assets/img/meebuddy/slider/8.png"}
  ];

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 1, 'autoplay': true, 'autoplaySpeed': 3500, 'dots': false, 'infinite': true, 'arrows': false, 'responsive': [{ 'breakpoint': 1600, 'settings': { 'slidesToShow': 3, 'slidesToScroll': 1, } }, { 'breakpoint': 1000, 'settings': { 'slidesToShow': 2, 'slidesToScroll': 1, } }, { 'breakpoint': 600, 'settings': { 'slidesToShow': 1, 'slidesToScroll': 1, } } ]};

}