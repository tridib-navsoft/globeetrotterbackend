import { Component } from '@angular/core';
import { LoginService } from './app.login.service';
import { Router } from '@angular/router';
import { GlobalService } from '../global/service/app.global.service';
import {CookieService} from 'ngx-cookie';

@Component({
  templateUrl: './templates/verification.html',
  providers: [LoginService]
})
export class VerifyCodeComponent  { 
	
	constructor(private _loginService: LoginService, private _router: Router, private _cookieService:CookieService, private _globalService: GlobalService) { }
	public response : any;
	public errorMsg: string;
	public successMsg: string;

	submitVerify(formModel:any){

		this._globalService.showLoaderSpinner(true);

		var forgot_data = this._cookieService.getObject('forgotPasswordData');
		if(forgot_data && forgot_data['user_id']){
			formModel.user_id = forgot_data['user_id']
			//formModel.email = forgot_data['email'];
		}

		this._loginService.verifyCode(formModel).subscribe(
	       data => {
	       		this.response = data;
	       		if(this.response.status == 200){
		            this._cookieService.putObject('forgotPasswordData', formModel);
					this._globalService.showLoaderSpinner(false);
	       			this._router.navigate(['/reset_password']);
	       		} else {	       			
					this._globalService.showLoaderSpinner(false);
	       			this.errorMsg = this.response.message;
	       		}
	       		
	       },
	       err => console.log(err),
	       function(){
	       		//completed callback
	       }
	    );
	}
}
