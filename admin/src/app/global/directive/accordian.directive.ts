
import { Directive, ElementRef, Renderer2,HostListener } from '@angular/core';

@Directive({ selector: '[accordianBox]' })
export class AccordianDirective {

    constructor(public el: ElementRef, public renderer: Renderer2) {}

    @HostListener('click') onClick() {

        var all_boxs = document.querySelectorAll('.boxs');        
        for (var i = 0, len = all_boxs.length; i < len; i++) {
            this.renderer.removeClass(all_boxs[i], 'active');
            this.renderer.addClass(all_boxs[i].querySelector('.acc_icon'), 'icon-addsvg');
            this.renderer.removeClass(all_boxs[i].querySelector('.acc_icon'), 'icon-minus');
        }
        
        this.renderer.addClass(this.el.nativeElement, 'active');
        this.renderer.removeClass(this.el.nativeElement.querySelector('.acc_icon'), 'icon-addsvg');
        this.renderer.addClass(this.el.nativeElement.querySelector('.acc_icon'), 'icon-minus');
    }

    ngOnInit(){
        // Use renderer to render the emelemt with styles
        
        var all_boxs = document.querySelectorAll('.boxs');        
        this.renderer.addClass(all_boxs[0], 'active');
        
    }
}