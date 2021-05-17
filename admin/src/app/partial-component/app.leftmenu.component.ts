import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from './app.menu.service';
import { GlobalService } from '../global/service/app.global.service';
@Component({
	selector: '<left-menu></left-menu>',
	templateUrl: './templates/left.html',
	providers: [MenuService]
})

export class LeftMenuComponent implements OnInit {

	public menu_data = {
		"Frontend": [
		  {
			"id": 1,
			"name": "Dashboard",
			"alt_name": "Dashboard",
			"link": "dashboard",
			"module": null,
			"css_class": "fa fa-tachometer",
			"parent_id": 0,
			"orders": 1,
			"all_action": "0",
			"add_action": "0",
			"edit_action": "0",
			"delete_action": "0",
			"view_action": "0",
			"block_action": "0",
			"import_action": "0",
			"export_action": "0",
			"shipping_processes": "0",
			"print": "0",
			"created": "2017-05-31",
			"modified": "2017-05-31",
			"isblocked": "0",
			"isdeleted": "0",
			"menu_type": "F",
			"child": [ ]
		  },
		  {
			"id": 2,
			"name": "Colleges",
			"alt_name": "Colleges",
			"link": "colleges",
			"module": null,
			"css_class": "fa fa-university",
			"parent_id": 0,
			"orders": 2,
			"all_action": "0",
			"add_action": "0",
			"edit_action": "0",
			"delete_action": "0",
			"view_action": "0",
			"block_action": "0",
			"import_action": "0",
			"export_action": "0",
			"shipping_processes": "0",
			"print": "0",
			"created": "2017-05-31",
			"modified": "2017-05-31",
			"isblocked": "0",
			"isdeleted": "0",
			"menu_type": "F",
			"child": [ ]
		  },
		  {
			"id": 3,
			"name": "Recruiters",
			"alt_name": "Recruiters",
			"link": "recruiters",
			"module": null,
			"css_class": "fa fa-users",
			"parent_id": 0,
			"orders": 3,
			"all_action": "0",
			"add_action": "0",
			"edit_action": "0",
			"delete_action": "0",
			"view_action": "0",
			"block_action": "0",
			"import_action": "0",
			"export_action": "0",
			"shipping_processes": "0",
			"print": "0",
			"created": "2017-05-31",
			"modified": "2017-05-31",
			"isblocked": "0",
			"isdeleted": "0",
			"menu_type": "F",
			"child": [ ]
		  },
		  {
			"id": 4,
			"name": "Students",
			"alt_name": "Students",
			"link": "customers",
			"module": null,
			"css_class": "fa fa-graduation-cap",
			"parent_id": 0,
			"orders": 4,
			"all_action": "0",
			"add_action": "0",
			"edit_action": "0",
			"delete_action": "0",
			"view_action": "0",
			"block_action": "0",
			"import_action": "0",
			"export_action": "0",
			"shipping_processes": "0",
			"print": "0",
			"created": "2017-05-31",
			"modified": "2017-05-31",
			"isblocked": "0",
			"isdeleted": "0",
			"menu_type": "F",
			"child": [ ]
		  },
		  {
			"id": 5,
			"name": "Settings",
			"alt_name": "Settings",
			"link": "#",
			"module": null,
			"css_class": "fa fa-cogs",
			"parent_id": 0,
			"orders": 5,
			"all_action": "0",
			"add_action": "0",
			"edit_action": "0",
			"delete_action": "0",
			"view_action": "0",
			"block_action": "0",
			"import_action": "0",
			"export_action": "0",
			"shipping_processes": "0",
			"print": "0",
			"created": "2017-05-31",
			"modified": "2017-05-31",
			"isblocked": "0",
			"isdeleted": "0",
			"menu_type": "F",
			"child": [ ]
		  },
		  {
			"id": 6,
			"name": "Email Templates",
			"alt_name": "Email Templates",
			"link": "",
			"module": null,
			"css_class": "fa fa-file-text",
			"parent_id": 0,
			"orders": 6,
			"all_action": "0",
			"add_action": "0",
			"edit_action": "0",
			"delete_action": "0",
			"view_action": "0",
			"block_action": "0",
			"import_action": "0",
			"export_action": "0",
			"shipping_processes": "0",
			"print": "0",
			"created": "2017-05-31",
			"modified": "2017-05-31",
			"isblocked": "0",
			"isdeleted": "0",
			"menu_type": "F",
			"child": [ ]
		  },
		  {
			"id": 7,
			"name": "Available Country",
			"alt_name": "Available Country",
			"link": "#",
			"module": null,
			"css_class": "fa fa-globe",
			"parent_id": 0,
			"orders": 10,
			"all_action": "0",
			"add_action": "0",
			"edit_action": "0",
			"delete_action": "0",
			"view_action": "0",
			"block_action": "0",
			"import_action": "0",
			"export_action": "0",
			"shipping_processes": "0",
			"print": "0",
			"created": "2017-05-31",
			"modified": "2017-05-31",
			"isblocked": "0",
			"isdeleted": "0",
			"menu_type": "F",
			"child": [ ]
		  },
		  {
			"id": 8,
			"name": "Skills Management",
			"alt_name": "Skills Management",
			"link": "#",
			"module": null,
			"css_class": "fa fa-leanpub",
			"parent_id": 0,
			"orders": 10,
			"all_action": "0",
			"add_action": "0",
			"edit_action": "0",
			"delete_action": "0",
			"view_action": "0",
			"block_action": "0",
			"import_action": "0",
			"export_action": "0",
			"shipping_processes": "0",
			"print": "0",
			"created": "2017-05-31",
			"modified": "2017-05-31",
			"isblocked": "0",
			"isdeleted": "0",
			"menu_type": "F",
			"child": [ ]
		  },
		  {
			"id": 9,
			"name": "Application History",
			"alt_name": "Application History",
			"link": "#",
			"module": null,
			"css_class": "fa fa-files-o",
			"parent_id": 0,
			"orders": 10,
			"all_action": "0",
			"add_action": "0",
			"edit_action": "0",
			"delete_action": "0",
			"view_action": "0",
			"block_action": "0",
			"import_action": "0",
			"export_action": "0",
			"shipping_processes": "0",
			"print": "0",
			"created": "2017-05-31",
			"modified": "2017-05-31",
			"isblocked": "0",
			"isdeleted": "0",
			"menu_type": "F",
			"child": [ ]
		  },
		  {
			"id": 10,
			"name": "Payment History",
			"alt_name": "Payment History",
			"link": "#",
			"module": null,
			"css_class": "fa fa-paypal",
			"parent_id": 0,
			"orders": 10,
			"all_action": "0",
			"add_action": "0",
			"edit_action": "0",
			"delete_action": "0",
			"view_action": "0",
			"block_action": "0",
			"import_action": "0",
			"export_action": "0",
			"shipping_processes": "0",
			"print": "0",
			"created": "2017-05-31",
			"modified": "2017-05-31",
			"isblocked": "0",
			"isdeleted": "0",
			"menu_type": "F",
			"child": [ ]
		  },
		  {
			"id": 11,
			"name": "Subscription History",
			"alt_name": "Subscription History",
			"link": "",
			"module": "ManageStore",
			"css_class": "fa fa-check-square",
			"parent_id": 0,
			"orders": 13,
			"all_action": "0",
			"add_action": "0",
			"edit_action": "0",
			"delete_action": "0",
			"view_action": "0",
			"block_action": "0",
			"import_action": "0",
			"export_action": "0",
			"shipping_processes": "0",
			"print": "0",
			"created": "2019-06-10",
			"modified": "2019-06-10",
			"isblocked": "0",
			"isdeleted": "0",
			"menu_type": "F",
			"child": [
			  /* {
				"id": 12,
				"name": "Manage Ecommerce Pages",
				"alt_name": "Manage Ecommerce Pages",
				"link": "manage_store",
				"module": "Pages",
				"css_class": "s_locator",
				"parent_id": 21,
				"orders": 2,
				"all_action": "0",
				"add_action": "0",
				"edit_action": "0",
				"delete_action": "0",
				"view_action": "0",
				"block_action": "0",
				"import_action": "0",
				"export_action": "0",
				"shipping_processes": "0",
				"print": "0",
				"created": "2017-05-31",
				"modified": "2017-05-31",
				"isblocked": "0",
				"isdeleted": "0",
				"menu_type": "F"
			  } */
			]
		  }
		]
	  }
	constructor(
		private _menuService: MenuService,
		private globalService: GlobalService,
		private elRef: ElementRef,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public renderer: Renderer2
	) {
		this.innerWidth = (window.screen.width);
	}
	public menu_list = {
		Frontend: [],
		//Admin: []
	};
	public admin_menu: boolean = false;
	public user_menu: boolean = true;
	public menu_text: string = 'Admin';
	public current_url: any;
	public innerWidth: any;
	public selected: number;
	ngOnInit() {
		this.current_url = this.router.url;
		this.current_url = this.current_url.replace('/', '')
		this.menu_list = this.menu_data
/* 		this._menuService.menuInit().subscribe(
			data => {
				this.menu_list = data;
			},
			err => console.log(err),
			function () {
				//completed callback
			}
		); */
	}

	toggleMenu() {
		this.admin_menu = !this.admin_menu;
		this.user_menu = !this.user_menu;
		if (this.admin_menu) {
			this.menu_text = 'Back to Admin';
		} else {
			this.menu_text = 'Admin';
		}
	}

	setActive(select_id: number, is_parent: number) {
		if (is_parent > 0 || select_id == 1) {
			this.selected = select_id;
		}
		if (this.innerWidth < 1000 && is_parent == 0) {
			document.querySelector('.maincontainer').classList.add('full');
		}
/* 		setTimeout(() => {
			if (this.innerWidth > 700 && is_parent > 0) {
				var all_ele = document.querySelectorAll('.sub-li');
				for (var i = 0, len = all_ele.length; i < len; i++) {
					this.renderer.removeClass(all_ele[i], 'show');
				}
				document.querySelector('.parent').classList.add('show');
			} else if (this.innerWidth > 700 && is_parent == 0) {
				if (document.querySelector('.show').classList) {
					//document.querySelector('.show').classList.remove('show');
				}
			}
		}, 500); */
	}

	changeClass() {
		if (document.querySelector('.maincontainer').classList.contains('full')) {
			document.querySelector('.maincontainer').classList.remove('full');
		} else {
			document.querySelector('.maincontainer').classList.add('full');
		}

		if (document.querySelector('.innertab_sec').classList.contains('full_intab')) {
			document.querySelector('.innertab_sec').classList.remove('full_intab');
		} else {
			document.querySelector('.innertab_sec').classList.add('full_intab');
		}

/* 		if (document.querySelector('.bottom_fixedpart').classList.contains('back_expand')) {
			document.querySelector('.bottom_fixedpart').classList.remove('back_expand');
		} else {
			document.querySelector('.bottom_fixedpart').classList.add('back_expand');
		} */
	}
}