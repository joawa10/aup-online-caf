import { Component, OnInit } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarousel]
  ,styles: [` .img-fluid{ min-width:100%}`]
})
export class HomeComponent {
  showNavigationArrows = true;
  showNavigationIndicators = true;

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 1000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
    // config.showNavigationArrows = true;
    // config.showNavigationIndicators = true;
  }

 
}
