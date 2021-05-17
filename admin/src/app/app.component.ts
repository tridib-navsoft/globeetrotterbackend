import { mergeMap, map, filter} from 'rxjs/operators';
import { Component, Injectable, OnInit, Inject, NgZone, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common'
import { CookieService} from 'ngx-cookie';
import { GlobalService } from './global/service/app.global.service';
import { Global } from './global/service/global';
import { routerTransition } from './router.animations';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [ Global ],
  animations: [ routerTransition ],
})
export class AppComponent implements OnInit, AfterViewInit {
	innerWidth: any;
	navLinks: any=[];
	tabs: any;
	public isSidebarVisible: boolean = false;
	public showSpinnerLoaded: boolean = false;
	constructor(
		public router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title,
		@Inject(DOCUMENT) private document: any,
	  	private globalService: GlobalService,
	  	private global: Global,
	  	private zone:NgZone,
	  	private _cookieService:CookieService,
	) {
	  	this.innerWidth = (window.screen.width);
	  	// set user ip address in cookie
	  	this._cookieService.put('ipaddress', '192.168.0.125');
	}

  	ngAfterViewInit(){
		this.globalService.loadSpinnerChange$.subscribe(
			(value) => {
			  this.showSpinnerLoaded = value;
			}
		);
  	} 

  // Initialization method
	ngOnInit() {
		// route state change event
		this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map(() => this.activatedRoute),
			map((route) => {
				while (route.firstChild) route = route.firstChild;
				return route;
			}),
			filter((route) => route.outlet === 'primary'),
			mergeMap((route) => route.data),
			).subscribe((event) => {
				let styleName = 'frontendstyle.css';
				var styles = document.styleSheets;
					var href;
					for (var i = 0; i < styles.length; i++) {
					  if (styles[i].href != null) {
						href = styles[i].href.split("/");
						let value = href[href.length - 1];
						if (value === styleName) {
							if(this.router.url.includes('editor/page' )){
								styles[i].disabled = false;
							}
							else{
								styles[i].disabled = true;
							}
						  }
					  }
					}
				this.titleService.setTitle(event['title']+':Globee Trotter'); //set title of the html page
				if(event['is_login']) { //check if current route is before logged in
					this.isSidebarVisible = false; //hide sidebar from the page layout 
				} else {
					this.isSidebarVisible = true; //show sidebar on the page layout if route is after logged in
					this.zone.run(() => { // <== added
						this.isSidebarVisible = true;
					});
				}
			});
	}
	// Get the current or activated route state
	getState(outlet: any) {
	  return outlet.activatedRouteData.state;
	}
}
