
import { throwError as observableThrowError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../global/service/global';
import { GlobalService } from '../../global/service/app.global.service';

@Injectable()
export class TableService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;

    constructor(private _http: HttpClient, private globalService: GlobalService) { }

    loadCollegeTable(data: Object) {

        return this._http.post(this.baseApiUrl + 'college/list', data, this.globalService.getHttpOption()).pipe(map(res => res), catchError(this.handleError));
    }

    private handleError(error: Response) {
        return observableThrowError(error || "Server err");
    }
}