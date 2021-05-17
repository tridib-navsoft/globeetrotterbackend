import { Pipe, PipeTransform } from '@angular/core';
import { CookieService } from 'ngx-cookie';


@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

 public currencySymbol = 'INR';
 constructor(private _cookieService:CookieService) {
 	this.currencySymbol = this._cookieService.getObject('userData')['currencysymbol'];

 }

  transform(value: any, args?: any): any {
  	value = value ? value : 0;
  	return this.currencySymbol+' '+(value);
    
  }

}
