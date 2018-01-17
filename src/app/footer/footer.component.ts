import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var jQuery;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log(jQuery('body').height());
    // console.log(jQuery(window).height());
    // if (jQuery('body').height() > jQuery(window).height()) {
    //   alert('higher');
    //   jQuery('.footer').removeClass('pos');
    // } else {
    //   jQuery('.footer').addClass('pos');
    // }
  }

}
