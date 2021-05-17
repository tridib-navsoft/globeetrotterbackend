import { Component, OnInit, Input, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Global } from '../service/global';
import { GlobalService } from '../service/app.global.service';
import { CollegesService } from '../../colleges/colleges.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { DialogsService } from '../dialog/confirm-dialog.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CollegesAddEditComponent } from '../../colleges/colleges.add.edit.component';

export interface RecruiterSchema {
	position: number;
	college_name: string;
	representative_name: string;
	representative_email: string;
	representative_phone: number;
	representative_status: boolean;
	edit: string;
	delete: string;
}
@Component({
	selector: '<global-table></global-table>',
	templateUrl: './table.html',
	styleUrls: ['./table-data-admin.scss']
})

export class TableComponent implements OnInit, AfterViewInit {

	@Input() childData: { table: string, heading: string, tablink: string, tabparrentid: any, screen: any, ispopup: any, is_export: any, is_import: any, data: [], displayedColumns: string[], url: string };

	public userId: any;
	public post_data = {};
	public response: any;
	public temp_result=[];
	public temp_col=[];
	public showSkeletonLoaded: boolean = false;
	public page: number = 1;
	public item_per_page: any = 50;	
	displayedColumns: string[];
	dataSource: MatTableDataSource<RecruiterSchema>;
	selection = new SelectionModel<RecruiterSchema>(true, []);
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private globalService: GlobalService, private _cookieService: CookieService, @Inject(DOCUMENT) private document: any,
	private global: Global, public dialog: MatDialog, public _router: Router, public _collegesService: CollegesService, private dialogsService: DialogsService) { }

	//////////////////////////Initilise////////////////////////////
	ngOnInit() {
		let userData = this._cookieService.getObject('userData');
		// console.log(userData)
		this.userId = userData['uid'];
/* 		this.currencyCode = userData['currencyCode'];
		this.warehouse_id = userData['warehouse_id']; */
		this.generateGrid(0, '', '', '', '', this.childData.url);
		// this.displayedColumns = this.childData.displayedColumns;
		// this.dataSource = new MatTableDataSource<RecruiterSchema>(this.childData.data);
		for (let i = 0; i < 10; i++) {
			this.temp_result.push(i);
		}
		for (let i = 0; i < 5; i++) {
			this.temp_col.push(i);
		}

		this.globalService.skeletonLoader(true);

		this.globalService.loadSkeletonChange$.subscribe(
			(value) => {
				this.showSkeletonLoaded = value;
			}
		);
		this.showSkeletonLoaded = true;

		
	}

	ngAfterViewInit() {
		// this.dataSource.sort = this.sort;
		// this.dataSource.paginator = this.paginator;
	}

	getEditId(id: number) { 
		this.globalService.addTab('edit'+this.childData.tablink,this.childData.tablink+'/edit/'+id+'','Edit '+this.childData.heading,this.childData.tabparrentid);this.globalService.navigateToUrl('/'+this.childData.tablink+'/edit/'+id+'');
	 }

	 getDeleteId(id: number) {

		let data = {"college_id": id}

		this.dialogsService.confirm('Warning', 'Do you really want delete this College?').subscribe(res => {
			if (res) {
				this.globalService.showLoaderSpinner(true);
				this._collegesService.deleteCollegeById(data).subscribe(
					data => {
						this.response = data;
						this.globalService.showToast(this.response.message);
						this.generateGrid(0, '', '', '', '', this.childData.url);
						this.globalService.showLoaderSpinner(false);
					},
					err => console.log(err),
					function () {
					}
				);
			}
		});
/* 		 let data = {"college_id": id}
		 this._collegesService.deleteCollegeById(data).subscribe(
			data => {
				console.log(data);
			 },
			err => {
				console.log(err)
			 }
		 ) */
	 }
		/////////////////////////Grid//////////////////////////////////////////////
		generateGrid(reload: any, page: any, sortBy: any, filter: any, search: any, url: string) {
			this.globalService.skeletonLoader(true);
			/* 		if(search == '' || search == null) {
						this.search_text = '';
					} else {
						this.search_text = search; 
					} */
					let elements: NodeListOf<Element> = this.document.getElementsByClassName('action-box');
			
					let userData = this._cookieService.getObject('userData');
					this.post_data = { 
			/* 			"model": this.childData.table, 
						"screen_name": this.childData.screen, 
						"userid": this.userId, 
						"search": this.search_text.trim(),
						"order_by": this.sortBy, 
						"order_type": this.sortOrder, 
						"status": filter, 
						"warehouse_id": this.warehouse_id,
						"website_id": this.globalService.getWebsiteId(),
						"advanced_search": this.advanced_search, */
						"page_size": this.item_per_page,
						"page_number": this.page
					}
					// this.globalService.skeletonLoader(true);
					this.global.doGrid(this.post_data, url).subscribe(
						data => {
							this.response = data;
							if (this.response.status  == 200) {
								this.displayedColumns = this.response.columns;
								this.dataSource = new MatTableDataSource<RecruiterSchema>(this.response.data);
								this.dataSource.sort = this.sort;
								this.dataSource.paginator = this.paginator;
/* 								this.response.data.forEach(function (item: any) {
									if (item.representative_status == true) {
										item.representative_status = 'Active';
									} else {
										item.representative_status = 'Inactive';
									} */
							}
							//this.total_list=[];
							// console.log(this.response)
/* 							if (this.response.count > 0) {
								this.result_list = this.response.results[0].result;
								let that = this;
								this.result_list.forEach(function (item: any) {
									if (item.isblocked == 'n') {
										item.isblocked = 'Active';
									} else {
										item.isblocked = 'Inactive';
									}
									if (item.loyal_start_date != '') {
										item.loyal_start_date = that.globalService.convertDate(item.loyal_start_date, 'dd-MM-yyyy h:mm a');
									} else {
										item.loyal_start_date = item.loyal_start_date;
									}
									if (item.loyal_end_date != '') {
										item.loyal_end_date = that.globalService.convertDate(item.loyal_end_date, 'dd-MM-yyyy h:mm a');
									} else {
										item.loyal_end_date = item.loyal_end_date;
									}
									if (item.start_date != '') {
										item.start_date = that.globalService.convertDate(item.start_date, 'dd-MM-yyyy h:mm a');
									} else {
										item.start_date = item.start_date;
									}
									if (item.end_date != '') {
										item.end_date = that.globalService.convertDate(item.end_date, 'dd-MM-yyyy h:mm a');
									} else {
										item.end_date = item.end_date;
									}
									if (item.apply == 's') {
										item.apply = 'Shipping Address';
									} else {
										item.apply = 'Billing Address';
									}
									if (item.has_multiplecoupons == 'n') {
										item.has_multiplecoupons = 'No'
									} else {
										item.has_multiplecoupons = 'Yes'
									}
									if (item.tax_rate_id != '') {
										item.tax_rate_id = item.tax_rate_name;
									} else {
										item.tax_rate_id = item.tax_rate_id;
									}
									if (item.created != '') {
										//item.created=that.globalService.convertDate(item.created, 'dd-MM-yyyy h:mm a');
									}
									if (item.delivery_hour) {
										item.delivery_hour=that.globalService.convertDate(item.delivery_hour, 'dd-MM-yyyy h:mm a');
									} else {
										item.created = item.created;
									}
									if (item.view_type == '1') {
										item.view_type = 'With Login';
									} else {
										item.view_type = 'Without Login';
									}
									if (item.default_ean == 'y') {
										item.default_ean = 'Y';
									} else {
										item.default_ean = 'No';
									}
									if (item.customer_type) {
										let customer_type = item.customer_group[0].name;
										item.customer_type = customer_type;
									}

									if (that.childData.table == 'EngageboostCategoryBanners') {
										item.banner_type = item.banner_type == 'C' ? 'Category Page' : 'Home Page';
									}						
								})
								for (let i = 0; i < this.response.count; i++) {
									this.total_list.push(i);
								}
							} else {
								this.result_list = [];
							} */
			
							// this.cols = this.response.results[0].applied_layout;
							// this.layout = this.response.results[0].layout;
			
/* 							this.cols = this.response.results[0].applied_layout;
							this.layout = this.response.results[0].layout;
			
			
							
							this.colSpanCount = this.response.results[0].layout.length;
							this.pagination.total_page = this.response.per_page_count;
							this.pageList = this.response.per_page_count;
							this.stat.active = this.response.results[0].active;
							this.stat.inactive = this.response.results[0].inactive;
							this.stat.all = this.response.results[0].all;
							this.add_btn = this.response.results[0].add_btn;
							this.config.currentPageCount = this.result_list.length
							this.config.currentPage = page
							this.config.itemsPerPage = this.response.page_size;
							
							this.pageItemArr.push(this.response.page_size);
							var unique = this.pageItemArr.filter(function (elem, index, self) {
								return index === self.indexOf(elem);
							})
							this.item_per_page = this.response.page_size;
							this.pageItemArr = unique.sort(function (a, b) { return a - b });
			
							this.permission = this.response.results[0].role_permission;
							if (this.childData.table == 'EngageboostGlobalSettings') {
								this.show_btn.add = false;
								this.show_btn.block = false;
								this.show_btn.delete = false;
							}
							if (this.childData.table == 'EngageboostCurrencyMasters') {
								this.show_btn.add = false;
								this.show_btn.edit = false;
								this.show_btn.block = false;
								this.show_btn.delete = false;
							} */
							
							
							let from = 0;
							if (page <= 0 || page == '') {
								page = 1;
								from = 0;
							} else {
								let start = page - 1;
								from = start * this.response.page_size;
							}
							if (from < 0) {
								from = 0;
							}
							
/* 							this.paginateData.from = 1
							let fromCount: any = 0;
							if (from != 0) {
								fromCount = from
								this.paginateData.from = from;
							}
							this.paginateData.upTo = parseInt(fromCount) + parseInt(this.config.currentPageCount);
							this.paginateData.totalRecord = this.response.count; */
							
							
							this.globalService.skeletonLoader(false);
							// Fired click event as data not loading....
							// let myelement: HTMLElement = this.document.getElementsByClassName('autoclick');
							// myelement[0].click();
						},err=>{
							console.log(err)
							this.globalService.skeletonLoader(true);
						}
					);
				}

    	////////////////////////////////Popups/////////////////////////////////////// 
	dialogRefColleges: MatDialogRef<CollegesAddEditComponent> | null;

	openPopup(id?: any) { 
		if (this.childData.table == 'GlobalCollege') {
			this.dialogRefColleges = this.dialog.open(CollegesAddEditComponent, { data: id });
			this.dialogRefColleges.afterClosed().subscribe(result => {
				this.generateGrid(0, '', '', '', '', this.childData.url);
			});
		}
		
	 }

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: RecruiterSchema): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

}
