import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core'; 
import { BehaviorSubject } from 'rxjs';
import { CookieService} from 'ngx-cookie';
import { GlobalService } from './app.global.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

'use strict';
export const GlobalVariable = Object.freeze({
  //BASE_API_URL: 'http://' + window.location.hostname + ':8085/api/',
  BASE_FRONTEND_API_URL:  'http://' + window.location.hostname + ':8085/api/front/v1/',
  //BASE_API_URL: 'http://tesco.grocersolution.com:8085/api/',
  BASE_API_URL: 'http://navsoft.co.in:8888/',
   //BASE_API_URL: 'http://30e849ce.ngrok.io/api/',
   //BASE_API_URL: 'http://192.168.0.125:8085/api/',
   GOOGLE_CLIENT_ID: '74854632065-86uci4hndsgo2eljc8nh45uh2ol2qgtg.apps.googleusercontent.com',
   //S3_URL: 'http://boostmysale.s3.amazonaws.com/Grocery/grocery/',
   S3_URL: 'http://boostmysale.s3.amazonaws.com/',
   apiPort:8000,
   elasticURL: '54.161.225.29:9200/',
   //BASE_Frontend_URL: 'http://navsoft.co.in/',
   BASE_Frontend_URL: 'http://navsoft:89/',
});

@Injectable()
export class Global {

    private baseApiUrl = GlobalVariable.BASE_API_URL;
    private frontUrl = GlobalVariable.BASE_Frontend_URL;
    private basefrontendApiUrl=GlobalVariable.BASE_FRONTEND_API_URL;

    constructor(
        private _http: HttpClient, 
        private _cookieService: CookieService, 
        private globalService: GlobalService, 
        private _router: Router,
        public dialog: MatDialog,

    ) {
        
    }
    
    public post_data = {};
    
    private globalData = new BehaviorSubject < any > (0);
    globalDataSet = this.globalData.asObservable();

    setData(val: any) {
        this.globalData.next(val);
    }

    doGrid(data: any, url: string) {

        return this._http.post(this.baseApiUrl + url, data, this.globalService.getHttpOption()).pipe(
            map(res => res),
            catchError(this.handleError), );
    }

/*     doGrid(data: any, page: number) {
        if (!page) {
            var url = this.baseApiUrl + 'global_list/';
        } else {
            var url = this.baseApiUrl + 'global_list/?page=' + page;
        }
        return this._http.post(url, data, this.globalService.getHttpOption()).pipe(
            map(res => res),
            catchError(this.handleError), );
    } */
    doGridInvoice(data: any, page: number) {
        if (!page) {
            var url = this.baseApiUrl + 'invoicelist/?page=1';
        } else {
            var url = this.baseApiUrl + 'invoicelist/?page=' + page;
        }
        return this._http.post(url, data, this.globalService.getHttpOption()).pipe(
            map(res => res),
            catchError(this.handleError), );
    }
    doGridPurchase(data: any, page: number) {
        if (!page) {
            var url = this.baseApiUrl + 'purchaseorderlist/?page=1';
        } else {
            var url = this.baseApiUrl + 'purchaseorderlist/?page=' + page;
        }
        return this._http.post(url, data, this.globalService.getHttpOption()).pipe(
            map(res => res),
            catchError(this.handleError), );
    }
    private handleError(error: Response) {
        return observableThrowError(error || "Server err");
    }

    doStatusUpdate(model: any, bulk_ids: any, type: any) {
        var up_arr: any = [];
        bulk_ids.forEach(function(item: any) {
            var obj = {
                "id": item
            };
            up_arr.push(obj);
        });
        if (type == 2) {
            var field_name = 'isdeleted';
            var val = 'y';
        } else if (type == 1) {
            var field_name = 'isblocked';
            var val = 'y';
        } else if (type == 0) {
            var field_name = 'isblocked';
            var val = 'n';
        }
        this.post_data = {
            "table": {
                "table": model,
                "field_name": field_name,
                "value": val
            },
            "data": up_arr
        }

        return this._http.post(this.baseApiUrl + 'globalupdate/', this.post_data, this.globalService.getHttpOption()).pipe(
            map(res => res),
            catchError(this.handleError), );
    }
    
    doGridFilter(model: any, isdefault: any, cols: any, screen: any) {
        if (isdefault == 1) {
            this.post_data = {
                model: model,
                is_default: isdefault,
                screen_name: screen,
                "header_name": "",
                "field_name": "",
                website_id: this.globalService.getWebsiteId(),
                company_id: this.globalService.getCompanyId()
            }
        } else {
            var header_name: any = [];
            var field_name: any = [];
            cols.forEach(function(item: any) {
                if (item.show == 1) {
                    header_name.push(item.title);
                    if (item.child != '') {
                        field_name.push(item.field + '.' + item.child);
                    } else {
                        field_name.push(item.field);
                    }
                }
            });
            var header_name = header_name.join("@@");
            var field_name = field_name.join("@@");
            this.post_data = {
                model: model,
                screen_name: screen,
                "header_name": header_name,
                "field_name": field_name,
                website_id: this.globalService.getWebsiteId(),
                company_id: this.globalService.getCompanyId()
            }
        }

        return this._http.post(this.baseApiUrl + 'global_list_filter/', this.post_data, this.globalService.getHttpOption()).pipe(
            map(res => res),
            catchError(this.handleError), );
    }


    Ipaddress() {
        //return this._http.get('https://freegeoip.net/json/', {})
        return this._http.get('http://api.ipstack.com/182.71.170.222?access_key=f39f58470675618d96e26d751a2d24f0', {}).pipe(
            map(res => res),
            catchError(this.handleError), );

    }

    libLoad(type: string,searchText:string) {

        return this._http.post(this.baseApiUrl + 'allproductcategoryimages/', {
            type: type,
            keyword: searchText
        }, this.globalService.getHttpOption()).pipe(
            map(res => res),
            catchError(this.handleError), );
    }

    globalAutocomplete(data: any) {
        var url = this.baseApiUrl + 'autocomplete/';
        return this._http.post(url, data, this.globalService.getHttpOption()).pipe(
            map(res => res),
            catchError(this.handleError), );
    }

    exportData(data: any, page: number) {
        if (!page) {
            var url = this.baseApiUrl + 'global_list_export/';
        } else {
            var url = this.baseApiUrl + 'global_list_export/?page=' + page;
        }

        data['website_id'] = this.globalService.getWebsiteId();
        data['company_id'] = this.globalService.getCompanyId();
        return this._http.post(url, data, this.globalService.getHttpOption()).pipe(map(res => res),catchError(this.handleError),);
    }

    viewNotification(obj: any) {
        if (obj.action_type == 'order') {
            this._router.navigate(['/orders/view/' + obj.data.id]);
        }
    }

    getWebServiceData(action: any, method: any, data: any, id: any) {
        if (method == 'GET') {
            if (id != '') {
                return this._http.get(this.baseApiUrl + action + '/' + id+'/', this.globalService.getHttpOption()).pipe(
                    map(res => res),
                    catchError(this.handleError), );
            } else {
                return this._http.get(this.baseApiUrl + action + '/', this.globalService.getHttpOption()).pipe(
                    map(res => res),
                    catchError(this.handleError), );
            }
        } else if (method == 'PUT') {
            if(id > 0) {
                return this._http.put(this.baseApiUrl + action + '/' + id + '/', data, this.globalService.getHttpOptionFile()).pipe(
                    map(res => res),
                    catchError(this.handleError), );
            } else {
                return this._http.put(this.baseApiUrl + action + '/' + id, data, this.globalService.getHttpOptionFile()).pipe(
                    map(res => res),
                    catchError(this.handleError), );
            }
            
        } else {
            return this._http.post(this.baseApiUrl + action + '/', data, this.globalService.getHttpOption()).pipe(
                map(res => res),
                catchError(this.handleError), );
        }
    }

    uploadFile(action: any, method: any, data: any) {
        return this._http.post(this.baseApiUrl + action + '/', data, this.globalService.getHttpOptionFile()).pipe(
            map(res => res),
            catchError(this.handleError));
    }

    getTaxSettings(website_id) {
      return this._http.get(this.baseApiUrl + 'taxsettings/'+website_id+'/', this.globalService.getHttpOption()).pipe(
          map(res => res),
          catchError(this.handleError),);
    }

    generateSheet(link){
        let url = this.baseApiUrl +link;
        return this._http.post(url,'', this.globalService.getHttpOption()).pipe(
            map(res => res),
            catchError(this.handleError), );
    }

    openEditor(page) { 
        //window.open(this.frontUrl+"editor/page/"+page, "_blank");
        let userData = this._cookieService.getObject('userData');
        window.open(userData["domain_name"] + "en/editor/page/" + page, "_blank");
    }

    loadColumnVisibility(data: any) {
        var url = this.baseApiUrl + 'grid_layout/';
        return this._http.post(url, data, this.globalService.getHttpOption()).pipe(
            map(res => res),
            catchError(this.handleError));
    }
    
    reset_dialog(){
        this.dialog.afterOpened.subscribe(() => {
            let containerElem:HTMLElement = <HTMLElement>document.getElementsByClassName('mat-dialog-container')[0];
            containerElem.classList.remove('pop-box-up');
        });
    }

     warehouseLoad(websiteId,userId){
        return this._http.get(this.baseApiUrl + 'warehousestockmanagement/' + websiteId + '/' + userId+'/', this.globalService.getHttpOption()).pipe(
             map(res =>  res),
             catchError(this.handleError),);
    }

     getDeliverySlotData(action: any, method: any, data: any, picking_type: any) {
        if (method == 'GET') {
            if (picking_type != '') {
                return this._http.get(this.baseApiUrl + action + '/?picking_type='+picking_type, this.globalService.getHttpOption()).pipe(
                    map(res => res),
                    catchError(this.handleError), );
            } else {
                return this._http.get(this.baseApiUrl + action + '/', this.globalService.getHttpOption()).pipe(
                    map(res => res),
                    catchError(this.handleError), );
            }
        } 
    }



    getCategoryBannerData(action:any,query_string) {
        if(query_string!= '' ) {
            return this._http.get(this.baseApiUrl + action + '/?'+query_string, this.globalService.getHttpOption()).pipe(
                    map(res => res),
                    catchError(this.handleError), );
        } else {
            return this._http.get(this.baseApiUrl + action + '/', this.globalService.getHttpOption()).pipe(
                    map(res => res),
                    catchError(this.handleError), );
        }
    }

    // CMS Start
    cmsFormSubmit(data: any) {
        return this._http.post(this.basefrontendApiUrl + 'cms_form_data/', data).pipe(
            map(res => res),
            catchError(this.handleError), );
    }


    getParentCategoryList() {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'WID': this.globalService.getWebsiteId().toString()
    });
    let options = {
        headers: headers
    };
        return this._http.post(this.basefrontendApiUrl +'parent-category-list/',{},options).pipe(
            map(res => res),
            catchError(this.handleError), );
 
    }
    /**
     * Method for getting shop by category
     * @access public
    */
    getShopByCategoryData() {

    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'WID': this.globalService.getWebsiteId().toString()
    });
    let options = {
        headers: headers
    };
 
      return this._http.get(this.basefrontendApiUrl+'shop_by_category/',options).pipe(map(res =>  res),catchError(this.handleError));
 
    }
    getShopByCategoryDataByCategoryId(categoryId = []) {
      let categoryData:FormData = new FormData();
      categoryData.append('website_id',this.globalService.getWebsiteId().toString());
     //  categoryData.append('sel_type', 'parent');
      categoryId.forEach(singleCategoryData => {
 
        categoryData.append('category_ids[]',singleCategoryData);
 
      });
      return this._http.post(this.basefrontendApiUrl+'shop_by_categoryids/',categoryData).pipe(map(res => res),catchError(this.handleError));
 
      
    }
    /**
     * Method for getting product by parent category id
     * @param categoryId
     * @access public
     * @return categoryList
    */
    getProductByCategoryId(categoryId,warehouseId,lang_code) {
      let categoryData:FormData = new FormData();
     //  categoryData.append('warehouse_id',warehouseId);
      categoryData.append('website_id',this.globalService.getWebsiteId().toString());
      categoryData.append('category_id',categoryId);
      categoryData.append('lang_code',lang_code);
      return this._http.post(this.basefrontendApiUrl+'product-list/',categoryData).pipe(map(res => res),catchError(this.handleError));
    }
    /**
     * Method for getting category banner data
     * @return categoryBannerData
    */
    getCategoryBannerList() {
      let categoryBannerData:FormData = new FormData();
      categoryBannerData.append('website_id',this.globalService.getWebsiteId().toString());
      categoryBannerData.append('applicable_for','web');
      categoryBannerData.append('banner_type','C');
      return this._http.post(this.basefrontendApiUrl+'category_banner_for_home/',categoryBannerData).pipe(map(res => res),catchError(this.handleError));
    }
    /**
     * Method for getting promotion banner list
     * @access public
    */
    getPromotionsBanner() {
 
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'WID': this.globalService.getWebsiteId().toString()
    });
    let options = {
        headers: headers
    };
           
      return this._http.get(this.basefrontendApiUrl+'promotional-banner-list/',options).pipe(map(res => res),catchError(this.handleError));
 
    }
    /**
     * Method for getting banner details by banner id and banner type
     * @access public
 
    */
    public  getCategoryBannerByBannerId(bannerId = [],bannerType = '') {
      let bannerData = new FormData();
      bannerData.append('banner_type',bannerType);
      bannerData.append('applicable_for','category');
      bannerData.append('website_id',this.globalService.getWebsiteId().toString());
      bannerId.forEach(singleBannerId => {
        bannerData.append('category_banner_id[]',singleBannerId);
 
      });
      return this._http.post(this.basefrontendApiUrl+'banner_list/',bannerData).pipe(map(res => res),catchError(this.handleError));
      
 
    }
    /**
     * Method for getting banner details by banner id and banner type
     * @access public
 
    */
    public  getPromotionalBannerByBannerId(bannerId = [],bannerType = '') {
      let bannerData = new FormData();
      bannerData.append('banner_type',bannerType);
      bannerData.append('website_id',this.globalService.getWebsiteId().toString());
      bannerId.forEach(singleBannerId => {
        bannerData.append('banner_ids[]',singleBannerId);
 
      });
      return this._http.post(this.basefrontendApiUrl+'promotional-banner/',bannerData).pipe(map(res => res),catchError(this.handleError));
      
 
    }
 
    /**
     * Method for getting brand list data
     * @access public
     * @param brandId List
    */
    getBrandListByBrandId(brandListId = []) {
      let brandData = new FormData();
      brandData.append('website_id',this.globalService.getWebsiteId().toString());
      brandListId.forEach(singleBrandId => {
        brandData.append('brand_ids[]',singleBrandId);
      });
      return this._http.post(this.basefrontendApiUrl+'brand_list_by_brandid/',brandData).pipe(map(res => res),catchError(this.handleError)); 
    }
    getBrands(data) {
      
     return this._http.post(this.basefrontendApiUrl+'brand_list/',data).pipe(
        map(res =>  res),
        catchError(this.handleError));
 
     }
     getProductsES(advancedSearch, websiteId) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'WID': this.globalService.getWebsiteId().toString()
        });
        let options = {
            headers: headers
        };
        let payload: any = {}
        payload.table_name = "EngageboostProducts";
        payload.website_id = this.globalService.getWebsiteId().toString()
        payload.data = advancedSearch;
    
        return this._http.post(this.baseApiUrl + 'search_elastic/', payload, options).pipe(
          map(res => res),
          catchError(this.handleError));
      }
      getFontAwsomes() {
        return this._http.get('https://d2vltvjwlghbux.cloudfront.net/frontend/assets/font-awsome.json').pipe(map(res => res), catchError(err => this.handleError(err)));
    }
    uploadCroppedImage(data: any) {
         let userData = this._cookieService.getObject('userData');
        let headers = new HttpHeaders({
            'Authorization': 'Token ' + userData['auth_token']
        });
        let options = { headers: headers };

        return this._http.post(this.baseApiUrl + 'temp_image_load/', data, options).pipe(
            map(res => res),
            catchError(err => this.handleError(err)));
    }
}

