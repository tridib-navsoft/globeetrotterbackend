import {throwError as observableThrowError,  Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core'; 
import {CookieService} from 'ngx-cookie';
import { GlobalVariable } from '../global/service/global';
//import { LoginComponent } from './app.login.component';
//import { LoginService } from './app.login.service';
import { GlobalService } from '../global/service/app.global.service';
@Injectable()
export class MenuService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;
    constructor(
      private _http: HttpClient,
      private _cookieService:CookieService,
      private globalService:GlobalService
    ) {

    }

    public user_id: string;
    menuInit() {
        let userData = this._cookieService.getObject('userData');
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token '+userData['auth_token']
        });
        let options = { headers: headers };
        if(userData){
          this.user_id = userData['uid'];
        }
       return this._http.get(this.baseApiUrl+'getmenu/'+this.user_id+'/', this.globalService.getHttpOption()).pipe(
       map(res =>  res),
       catchError(this.handleError),);
    }

    private handleError(error: Response) { 
      return observableThrowError(error || "Server err");
   }
 }