import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie'; 
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class GlobalService {
    isSidebarVisible: boolean;
    activeTabIndex: number = 0;
    navLinks: any = [{
            id: 1,
            label: 'Dashboard',
            url: 'dashboard',
            parent: 0
        }]
        // Observable
    private tabChangeSource = new Subject < number > ();
    private tabIndexChangeSource = new Subject < number > ();
    private sidebarVisibilitySource = new Subject < boolean > ();
    private profileNameSource = new Subject < string > ();
    public imageArraySource = new Subject < any > ();
    public libArraySource = new Subject < any > ();
    public loadSpinnerSource = new Subject < boolean > ();
    public loadSkeletonSource = new Subject < boolean > ();
    public isLoading = new BehaviorSubject(false);
    public websitelist = new Subject < any > ();
    websitelist$ = this.websitelist.asObservable();
    tabChange$ = this.tabChangeSource.asObservable();
    tabIndexChange$ = this.tabIndexChangeSource.asObservable();
    sidebarVisibilityChange$ = this.sidebarVisibilitySource.asObservable();
    profileNameChange$ = this.profileNameSource.asObservable();
    imageArrayChange$ = this.imageArraySource.asObservable();
    libArrayChange$ = this.libArraySource.asObservable();
    loadSpinnerChange$ = this.loadSpinnerSource.asObservable();
    loadSkeletonChange$ = this.loadSkeletonSource.asObservable();
    public changeWebSite = new Subject< any >();
    chnageWebSite$ = this.changeWebSite.asObservable();
    public changedaterange = new Subject < any >();
    changedaterange$ = this.changedaterange.asObservable();
    public isFormLoaded: any = 'Yes';
    // Observable number streams
    constructor(private _router: Router, private _cookieService: CookieService, private snackBar: MatSnackBar, private datePipe: DatePipe, ) {
        this.isSidebarVisible = false;
        this.changeLoginStatus();
    }
    changeLoginStatus() {
        if (this.isLoggedIn()) {
            let path = window.location.pathname;
            //this._router.navigate([path]); // redirect to save URL 
            if (path == '/' || path == '/login') {
                this._router.navigate(['/dashboard']);
            }
        }
    }
    onChangeWebsite() {
        this.changeWebSite.next(true);
    }

    onchangedaterange(){
        this.changedaterange.next(true);
    }
    toggleSidebarVisibilty() {
        this.isSidebarVisible = !this.isSidebarVisible;
        this.sidebarVisibilitySource.next(this.isSidebarVisible);
    }
    setTab(index: number, link: string) {
        // console.log(index);
        // console.log("=======================");
        // console.log(link);
        this.activeTabIndex = index;
        this._cookieService.put('active_tabs', this.activeTabIndex.toString());
        this.navLinks[index]['url'] = link;
        this._cookieService.putObject('tabs', this.navLinks);
        // trigger change event
        this.tabChangeSource.next(this.navLinks);
    }
    addTab(id: any, link: string, label: string, parent_id: number) {
        //console.log("Id = "+id + " Link==" + link + " label ===" + label + " parent ID ===" + parent_id);
        var is_exist = 0;
        var match_index = 0;
        for (var i = 0; i < this.navLinks.length; i++) {
            if (id == this.navLinks[i]['id']) {
                is_exist = 1;
                match_index = i;
                break;
            }
        }
        if (is_exist == 0) {
            var index = this.navLinks.push({
                "id": id,
                "label": label,
                "url": link,
                "parent": parent_id
            });
            // update active link 
            this.activeTabIndex = index;
            //session storage update
            this._cookieService.putObject('tabs', this.navLinks);
            // trigger change event
            //this.tabChangeSource.next(this.navLinks);
            //this.tabChangeIndexSource.next(this.activeTabIndex);
        }
        else {
            // update active link   
            this.navLinks[match_index].url = link;
            this.activeTabIndex = match_index;
            //this.tabIndexChangeSource.next(this.activeTabIndex);
        }
        this._cookieService.put('active_tabs', this.activeTabIndex.toString());
    }
    /**
     * Method for redirecting to url
     * @access public
    */
    navigateToUrl(url:string = '') {
        this._router.navigate([url]);
    } 
    
    deleteTab(index: number, parent: number) {
        // console.log("Index = "+index+" Parents ========"+parent)
        this.skeletonLoader(true);
        this.navLinks.splice(index, 1);
        this.tabChangeSource.next(this.navLinks);
        //session storage code goes here
        this._cookieService.putObject('tabs', this.navLinks);
        var parent_index = 0;
        if (parent > 0) {
            for (var i = 0; i < this.navLinks.length; i++) {
                if (this.navLinks[i]['id'] == parent) {
                    parent_index = i;
                }
            }
            if (parent_index > 0) {
                this._router.navigate([this.navLinks[parent_index]['url']]);
                this.activeTabIndex = parent_index;
            }
            else {
                this._router.navigate([this.navLinks[0]['url']]);
                this.activeTabIndex = 0;
            }
        }
        else {
            if (this.activeTabIndex > (this.navLinks.length - 1)) {
                this._router.navigate([this.navLinks[this.activeTabIndex - 1]['url']]);
                this.activeTabIndex = this.activeTabIndex - 1;
            }
            else {
                this._router.navigate([this.navLinks[0]['url']]);
                this.activeTabIndex = 0;
            }
        }
        this._cookieService.put('active_tabs', this.activeTabIndex.toString());
    };
    getParentTab(index: number) {
        var tab_data: any = {};
        tab_data = this._cookieService.getObject('tabs');
        if (tab_data) {
            return tab_data['parent'];
        }
        else {
            return 0;
        }
    }
/*     getParentTab(index: number) {
        var tab_data: any = {};
        tab_data = this._cookieService.getObject('tabs');
        if (tab_data) {
            return tab_data[index]['parent'];
        }
        else {
            return 0;
        }
    } */
    getParentId(index: number) {
        var tab_data: any = {};
        tab_data = this._cookieService.getObject('tabs');
        if (tab_data) {
            return tab_data[index]['id'];
        }
        else {
            return 0;
        }
    }
    getUserId() {
        var userData = this._cookieService.getObject('userData');
        var user_id = 0;
        if (userData && userData.hasOwnProperty('uid')) {
            user_id = userData['uid'];
        }
        return user_id;
    }
    getCompanyId() {
        var userData = this._cookieService.getObject('userData');
        var company_id = 0;
        if (userData && userData.hasOwnProperty('company_id')) {
            company_id = userData['company_id'];
        }
        return company_id;
    }
    getWebsiteName() {
        var userData = this._cookieService.getObject('userData');
        var website_name = '';
        if (userData && userData.hasOwnProperty('business_name')) {
            website_name = userData['business_name'];
        }
        return website_name;
    }
    getWebsiteId() {
        var userData = this._cookieService.getObject('userData');
        var website_id = 1;
        if (userData && userData.hasOwnProperty('website_id')) {
            website_id = userData['website_id'];
        }
        return website_id;
    }
    updateUserCookie(data: any) {
        var cookie_data: any = {};
        cookie_data = this._cookieService.getObject('userData');
        if (cookie_data) {
            cookie_data.first_name = data.first_name;
            cookie_data.last_name = data.last_name;
            cookie_data.email = data.email;
            this._cookieService.putObject('userData', cookie_data);
            this.profileNameSource.next(data.first_name);
        }
    }
    isLoggedIn() {
        var userData = this._cookieService.getObject('userData');
        if (userData && userData.hasOwnProperty('isLoggedIn')) {
            return userData['isLoggedIn'];
        }
        else {
            return false;
        }
    }
    getCookie(key: string) {
        return this._cookieService.get(key);
    }
    getHttpOption() {
        let userData = this._cookieService.getObject('userData');
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': userData['auth_token']
        });
        let options ={
            headers: headers
        };
        return options;
    }
    getHttpOption2() {
        let userData = this._cookieService.getObject('userData');
        // console.log(userData);
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization': 'Token ' + userData['auth_token'],
            'Issuper'      :  userData['isSuperAdmin'],
            'Wid'          :  userData['website_id'],
            'Warehouseid'  :  userData['warehouse_id'],
            'Issub'        :  userData['isSubAdmin']
        });
        let options ={
            headers: headers
        };
        return options;
    }
    getHttpOptionFile() {
        let userData = this._cookieService.getObject('userData');
        let headers = new HttpHeaders({
            'Authorization': 'Token ' + userData['auth_token']
        });
        let options ={
            headers: headers
        };
        return options;
    }

    getHttpOptionNotLogin() {
        let userData = this._cookieService.getObject('userData');
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        let options ={
            headers: headers
        };
        return options;
    }

    showToast(msg: string) {
        this.snackBar.open(msg, 'x', {
            duration: 5000,
            verticalPosition: 'top'
        });
    }
    showToastNew(msg: string, msg_type: 'success') {
        let class_name = (msg_type == 'success' ? 'text-success' : 'text-danger');
        this.snackBar.open(msg, 'x', {
            duration: 5000,
            panelClass: class_name,
        });
    }
    showLoaderSpinner(show: boolean) {
        this.loadSpinnerSource.next(show);
    }
    skeletonLoader(show: boolean) {
        this.loadSkeletonSource.next(show);
    }

    convertDate(date: any, format: any= '') {
        return this.datePipe.transform(date, format); // format will need to implement from global settings
    }

    getArrayFromObj(obj:any) {
        let arr = Object.keys(obj).map(function (key) { return obj[key]; });
        return arr;
    }
    printPicklist(printSectionId: string) {
        let popupWinindow
        let innerContents = document.getElementById(printSectionId).innerHTML;
        popupWinindow = window.open('', '_blank', 'menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head>');
        popupWinindow.document.write('<link rel="stylesheet" href="' + window.location.protocol + '//' + window.location.hostname + ':3000/' + 'assets/css/print.css">');
        popupWinindow.document.write('</head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }

    get_order_status(code: number) {
      let status:any = [
        {code:0, name:'Pending'},
        {code:100, name:'Processing'},
        {code:2, name:'Cancelled'},
        {code:3, name:'Abondoned'},
        {code:4, name:'Completed'},
        {code:1, name:'Shipped'},
        {code:5, name:'Full Refund'},
        {code:6, name:'Partial Refund'},
        {code:99, name:'Waiting for Payment'},
        {code:7, name:'Payment Confirm'},
        {code:8, name:'Shipping Approval Pending'},
        {code:999, name:'Failed'},
        {code:11, name:'Paid'},
        {code:12, name:'Pre Order'},
        {code:13, name:'Delivered'},
        {code:14, name:'Damaged'},

      ];
      let status_text:any = '';
      status.forEach(function(item:any){
        if(code==item.code){
          status_text = item.name;
        }
      });
      return status_text;
    }

    getFormAction(roleObj: any, pageTitle) {
        // console.log(typeof roleObj)
        // console.log("--------------")
        // console.log(roleObj)
        if (typeof roleObj == 'string') {
            roleObj = JSON.parse(roleObj);
        }
        // console.log(roleObj)
        // console.log("--------------")
        if (roleObj == 83) {
            roleObj = '{"steps":{"roleSetting":[{"title":"Basic Info","activeLinkAdd":"add","activeLinkEdit":"edit","flag":true,"StepsName":"basicInfo"},\
        {"title":"Advanced Info","activeLinkAdd":"step2","activeLinkEdit":"step2","flag":true,"StepsName":"addvanceInfo"},\
        {"title":"Pricing","activeLinkAdd":"step3","activeLinkEdit":"step3","flag":true,"StepsName":"pricing"},\
        {"title":"Supplier","activeLinkAdd":"step4","activeLinkEdit":"step4","flag":true,"StepsName":"supplier"},\
        {"title":"Item Collection","activeLinkAdd":"step5","activeLinkEdit":"step5","flag":true,"StepsName":"itemCollection"},\
        {"title":"Related Products","activeLinkAdd":"step6","activeLinkEdit":"step6","flag":true,"StepsName":"relatedProducts"},\
        {"title":"Substitue Products","activeLinkAdd":"step7","activeLinkEdit":"step7","flag":true,"StepsName":"substitueProducts"}]}}';
            roleObj = JSON.parse(roleObj);
        }
        
        if (roleObj == 80) {
            roleObj = '{"steps":{"roleSetting":[{"title":"Basic Info","activeLinkAdd":"add","activeLinkEdit":"edit","flag":true,"StepsName":"basicInfo"},\
        {"title":"Advanced Info","activeLinkAdd":"step2","activeLinkEdit":"step2","flag":true,"StepsName":"addvanceInfo"}]}}';
            roleObj = JSON.parse(roleObj);
        }
       
        var selectedSteps = roleObj.steps.roleSetting.filter(function (stepObj) {
            return stepObj.flag === true;
        });
        return selectedSteps;
    }

    setStepsPerm(appliedSteps,activeTab) {    
        let stepsObj: any = {};
        let currentIndex:any = 0;
        let nextIndex = 0;
        let prevIndex = 0;
        let prevSteps = '';
        let nextSteps = '';
        let steps:object = {};
        if (appliedSteps.length > 0) {
            //console.log(appliedSteps);
            const selectedSteps = appliedSteps.map((steps) => steps.StepsName); // getting only applied steps
            for (let index in selectedSteps) {
                //console.log(selectedSteps[index]);
                stepsObj[selectedSteps[index]] = 1;
                if (activeTab == selectedSteps[index]) {
                    currentIndex = index;
                }
            }
            if(currentIndex == 0) { // this is for first steps
                nextIndex = parseInt(currentIndex)+1;
                prevIndex = 0;
                if (nextIndex < appliedSteps.length) {
                    let nextStepsSetting = appliedSteps[nextIndex];
                    //console.log(nextStepsSetting);
                    nextSteps = nextStepsSetting.activeLinkAdd; // getting the next step URl
                    prevSteps = '';
                } else { // this is the last index // Grid will call here
                    //nextIndex = 0
                    nextSteps = '';
                    prevSteps = '';
                }
            }

            if(currentIndex > 0) {
                nextIndex = parseInt(currentIndex) + 1;
                prevIndex = parseInt(currentIndex) - 1;
                if (nextIndex < appliedSteps.length) {
                    let nextStepsSetting = appliedSteps[nextIndex];
                    nextSteps = nextStepsSetting.activeLinkAdd; // getting the next step URl
                } else { // this is the last index // Grid will call here
                    //nextIndex = 0
                    nextSteps = '';
                }

                if (prevIndex >= 0) {
                    let prevStepsSetting = appliedSteps[prevIndex];
                    prevSteps = prevStepsSetting.activeLinkAdd; // getting the Prev step URl
                } else {
                    prevSteps =  '';
                }
            }

            stepsObj.nextPage = nextSteps;
            stepsObj.prevPage = prevSteps;
            // console.log("=====================");
            // console.log(stepsObj)    
        }
        return stepsObj;
    }
    check_file_ext(type: string) {

        var return_result = 0;
        switch (type) {
          case "image/png":
            return_result = 1;
            break;
          case "image/gif":
            return_result = 1;
            break;
          case "image/jpeg":
            return_result = 1;
            break;
    
          default:
            return_result = 0;
            break;
        }
    
        return return_result;
      }
    
    
      check_file_size(size: number) {
    
        let return_result: boolean;
        size = (size) / (1024 * 1024); // in MB
    
        if (size > 2) {
          return_result = false;
        } else {
          return_result = true;
        }
    
        return return_result;
      }
}


