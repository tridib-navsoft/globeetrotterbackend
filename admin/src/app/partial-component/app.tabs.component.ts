import { Component, HostListener, ChangeDetectorRef, ViewChild } from '@angular/core';
import { GlobalService } from '../global/service/app.global.service';
import {CookieService} from 'ngx-cookie';
@Component({
  selector: '<tabs></tabs>',
  templateUrl: './templates/page_tabs.html'
})
export class TabsComponent {
/* 	@HostListener('window:beforeunload', ['$event'])
	onBeforeUnload() {
	    this._cookieService.remove('tabs');
    	this._cookieService.remove('active_tabs');
	} */
	public navLinks: any;
	constructor(
		public globalService: GlobalService,
		private _cookieService:CookieService,
		private cdr: ChangeDetectorRef
	) {
		var tabs: any = _cookieService.getObject('tabs');
		if(tabs) {
			this.navLinks = tabs;
			globalService.navLinks = tabs;
		} else {
			this.navLinks = globalService.navLinks;
		}
		var active_index: number;
		active_index = +_cookieService.get('active_tabs');
		if(active_index>0){
			globalService.activeTabIndex = active_index;
		}
		globalService.tabChange$.subscribe(
	      	(value) => {
	      		this.navLinks = value;
	    	}
	    );
/* 	    globalService.tabIndexChange$.subscribe(
	      	(value) => {
	        	globalService.activeTabIndex = value;
	    	} 
	    ) */
	}

	setTabData(event) {
		let index = event.index;
		let url = this.navLinks[index].url;
		this.globalService.setTab(index, url);
		this.globalService.navigateToUrl(url);
	}	
}