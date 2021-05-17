import {throwError as observableThrowError,  Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core'; 
import {CookieService} from 'ngx-cookie';
import { GlobalVariable } from '../global/service/global';
import { GlobalService } from '../global/service/app.global.service';

@Injectable()
export class LoginService {
    
    private baseApiUrl = GlobalVariable.BASE_API_URL;
    constructor(private _http: HttpClient, private _cookieService: CookieService, private globalService: GlobalService) {}

    getCookie(key: string){
      return this._cookieService.get(key);
    }

    doLogin(data:any) {
   
      /*let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Token 09c3b932ba526c5038c54a6c4995a229b9606cb6');
      headers.append('X-CSRFToken', this.getCookie('csrftoken'));
      
      let options = new RequestOptions({ headers: headers,withCredentials: true });
      */
       return this._http.post(this.baseApiUrl+'login', data, {}).pipe(
       map(res =>  res),
       catchError(this.handleError),);     	    
    }

    GoogleLogin(data:any) {
       return this._http.post(this.baseApiUrl+'usercreate/', data, {}).pipe(
       map(res =>  res),
       catchError(this.handleError),);          
    }

    checkEmail(data:any) {
       return this._http.post(this.baseApiUrl+'forgotpassword', data, {}).pipe(
       map(res =>  res),
       catchError(this.handleError),);          
    }

    verifyCode(data:any) {
       return this._http.post(this.baseApiUrl+'receive/forgot/code', data, {}).pipe(
       map(res =>  res),
       catchError(this.handleError),);          
    }

    changePwd(data:any){
      return this._http.post(this.baseApiUrl+'change/forgot/pass', data, {}).pipe(
       map(res =>  res),
       catchError(this.handleError),); 
    }

    optvaluesend(data:any){
        return this._http.post(this.baseApiUrl+'createotp/', data, {}).pipe(
       map(res =>  res),
       catchError(this.handleError),);

    }
    checkotp(data:any){
        return this._http.post(this.baseApiUrl+'checkotp/', data, {}).pipe(
       map(res =>  res),
       catchError(this.handleError),);

    }

    private handleError(error: Response) { 
      return observableThrowError(error || "Server err"); 
   } 
 }