import { Component} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  constructor() { }

  slides = [
    { img : "/assets/img/meebuddy/slider/1.jpg"},
    { img : "/assets/img/meebuddy/slider/2.jpg"},
    { img : "/assets/img/meebuddy/slider/3.jpg"},
    { img : "/assets/img/meebuddy/slider/4.jpg"},
    { img : "/assets/img/meebuddy/slider/5.jpg"},
    { img : "/assets/img/meebuddy/slider/6.jpg"},
    { img : "/assets/img/meebuddy/slider/7.jpg"}
  ];

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 1, 'autoplay': true, 'autoplaySpeed': 3500, 'dots': false, 'infinite': true, 'arrows': false, 'responsive': [{ 'breakpoint': 1600, 'settings': { 'slidesToShow': 3, 'slidesToScroll': 1, } }, { 'breakpoint': 1000, 'settings': { 'slidesToShow': 2, 'slidesToScroll': 1, } }, { 'breakpoint': 600, 'settings': { 'slidesToShow': 1, 'slidesToScroll': 1, } } ]};

}