import { Directive, ElementRef, Renderer2, OnInit, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective { //implements OnInit {
  @HostBinding('class.open') isOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') toggleOpen() {
    console.log(this.isOpen,'dropdownclick');
    // if (this.isOpen) {
    //   this.renderer.removeClass(this.elementRef, 'open');
    // } else {
    //   this.renderer.addClass(this.elementRef, 'open');
    // }
    this.isOpen = !this.isOpen;
  }

  // ngOnInit() {
  //   this.renderer.addClass(this.elementRef, 'open');
  // }


}
