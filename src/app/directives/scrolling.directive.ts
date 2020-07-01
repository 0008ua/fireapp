import { Directive, HostListener, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScrolling]'
})
export class ScrollingDirective implements OnInit {
  elems = [];

  @Output() elementOnScreen = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  isElementOnScreen(elem: ElementRef['nativeElement']) {
    // elem.getBoundingClientRect(); видима обасть екрану до елемента
    // pageYOffset верх сторінки до верху видимой обасті
    // innerHeight висота видимої області
    const box = elem.getBoundingClientRect();
    // const screenTop = pageYOffset;
    // const screenBottom = pageYOffset + innerHeight;
    const elementTop = box.top;
    const elementBottom = box.bottom;
    if (elementBottom > 0 && elementTop <= innerHeight - innerHeight * .4) {
      return true;
    } else {
      return false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(e) {
    // this.elems.push(this.elementRef.nativeElement);
    // console.log('ref', this.elementRef.nativeElement);
    // console.log('e', this.elems);
    
    if (this.isElementOnScreen(this.elementRef.nativeElement)) {
      this.elementOnScreen.emit();
    }
  }

}
