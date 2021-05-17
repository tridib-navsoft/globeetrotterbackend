import { Component, OnInit, Inject, OnDestroy, AfterViewInit, AfterContentInit, Optional, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DomSanitizer } from '@angular/platform-browser';
// import { PaginationInstance } from 'ngx-pagination';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CookieService } from 'ngx-cookie';
import { GlobalService } from '../global/service/app.global.service';
import { Global, GlobalVariable } from '../global/service/global';
import { CollegesService } from './colleges.service';
import { DialogsService } from '../global/dialog/confirm-dialog.service'; 
import { AddEditStepFlipTransition } from '../router.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DOCUMENT} from '@angular/common';
@Component({
    selector: 'colleges-add',
    templateUrl: './colleges.add.edit.html',
    providers: [CollegesService],
    animations: [AddEditStepFlipTransition],
    host: {
        '[@AddEditStepFlipTransition]': ''
    },
})
export class CollegesAddEditComponent implements OnInit{

    @ViewChild("placesRef") placesRef : GooglePlaceDirective;

    public formModel: any = {};
    public response: any = {};
    public errorMsg: string;
    private sub: any;
    public ObjectKeys = Object.keys;
    public add_edit: any = '';
    public tabIndex: number;
    public parentId: number = 0;

    constructor(
        private collegeService: CollegesService,
        public _globalService: GlobalService,
		public global: Global,
        private _router: Router,
        private _route: ActivatedRoute,
        private _cookieService: CookieService,
        public dialog: MatDialog,
        @Inject(DOCUMENT) private document: any
    ) {
        this.tabIndex = this._globalService.activeTabIndex;
        this.parentId = this._globalService.getParentTab(this.tabIndex);
        //this.tabIndex = +this._globalService.getCookie('active_tabs'); // current active tab index
		//this.parentId = this._globalService.getParentTab(this.tabIndex); // parent id of the current active tab	
        let userData = this._cookieService.getObject('userData');
    }

    ngOnInit() { 
        this.sub = this._route.params.subscribe(params => {
            this.formModel.college_id = +params['id']; // (+) converts string 'id' to a number
         });

         this.collegeService.getCollegeById(this.formModel).subscribe(
            data => { 
                this.response = data;
                if(this.response.status == 200 && this.formModel.college_id !== NaN) {  
                    this.formModel = this.response;
                    this.formModel.college_id = this.response.data.college_id;
                    this.formModel.college_name = this.response.data.college_name;
                    this.formModel.college_represent_fname = this.response.data.college_represent_fname;
                    this.formModel.college_represent_lname = this.response.data.college_represent_lname;
                    this.formModel.representative_email = this.response.data.representative_email;
                    this.formModel.representative_phone = this.response.data.representative_phone;
                    this.formModel.college_password = this.response.data.college_password;
                    this.formModel.representative_status = this.response.data.representative_status;

                }
            },
            err => { 
                console.log(err)
            }
         )

         if (this.formModel.representative_status == null || this.formModel.representative_status == undefined) {
            this.formModel.representative_status = false;
         }
     }

    addEditColleges(collegeForm: any) {

        if(!collegeForm.valid){
            return;
           }

        if(!this.formModel.college_id && this.formModel.college_password !== this.formModel.confirm_password) {
            this._globalService.showToast("Passwords Doesn't Match!");
            return;
        }

/*         if(this.formModel.college_id == NaN && this.formModel.representative_status == null) { 
            this.formModel.representative_status == false;
        } */

        this._globalService.showLoaderSpinner(true);
    	this.errorMsg = '';
		
	    var data: any = {};
		data = Object.assign({}, this.formModel);

        this.collegeService.collegeAddEdit(data,this.formModel.college_id).subscribe(
            data => {
             this.response = data;
             this._globalService.showLoaderSpinner(false);
             this._globalService.showToast(this.response.message);
               if(this.response.status == 200){
                 this._globalService.deleteTab(this.tabIndex,this.parentId);
             } else {
                this.errorMsg = this.response.message;
                this._globalService.showToast(this.response.message);
             }
         },
            err => console.log(err),
            function(){
             //completed callback
            }
     );
     
    }

/*     public handleAddressChange(address: Address) {
		// Do some stuff
		this.formModel.address=address.formatted_address;
		this.formModel.longitude=address.geometry.location.lng();
		this.formModel.latitude=address.geometry.location.lat();
		// this.formModel.max_distance_sales="25";
		console.log(address)
	} */

}

