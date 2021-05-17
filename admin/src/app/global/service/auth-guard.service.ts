import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Router } from '@angular/router';
import { GlobalService } from './app.global.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
      private _router: Router, 
      private _globalService:GlobalService,
    ){
		//console.log("Working in constructor");
	}

  	canActivate() {
		console.log("Working in parent");  
    	if(!this._globalService.isLoggedIn()){
			  this._router.navigate(['/login']);
			  console.log("Parent false");
    		return false;
  		}else{
			console.log("Parent false");
  			return true;
  		}
  	}

  	canActivateChild() {
		//console.log("Working in child");  
  		if(!this._globalService.isLoggedIn()){
			  this._router.navigate(['/login']);
			  console.log("Child false");
    		return false;
  		}else{
			//console.log("Child true");    			
    		return true;
  		}    	
  	}

}

