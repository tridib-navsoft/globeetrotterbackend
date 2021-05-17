import { Injectable } from '@angular/core';
import {map, catchError} from 'rxjs/operators';
import {throwError as observableThrowError } from 'rxjs';
import {GlobalVariable } from '../global/service/global';
import { GlobalService } from '../global/service/app.global.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CollegesService {

  private baseApiUrl = GlobalVariable.BASE_API_URL;

  constructor(private _http: HttpClient,private globalService:GlobalService) { }

  collegeAddEdit(data: any, id:any){
    if(id>0){
      return this._http.put(this.baseApiUrl+'college/add/edit', data, this.globalService.getHttpOption()).pipe(
         map(res =>  res),
         catchError(this.handleError),);
    } else {
      return this._http.post(this.baseApiUrl+'college/add/edit', data, this.globalService.getHttpOption()).pipe(
         map(res =>  res),
      catchError(this.handleError),);
    }		
  }

  getCollegeById(id:number) {
    return this._http.post(this.baseApiUrl+'college/details', id, this.globalService.getHttpOption()).pipe(
      map(res =>  res),
      catchError(this.handleError),);
  }

  deleteCollegeById(id: Object) {
    return this._http.put(this.baseApiUrl+'college/delete', id, this.globalService.getHttpOption()).pipe(
      map(res =>  res),
      catchError(this.handleError),);
  }

  private handleError(error: Response) { 
    return observableThrowError(error || "Server err"); 
   } 

}
