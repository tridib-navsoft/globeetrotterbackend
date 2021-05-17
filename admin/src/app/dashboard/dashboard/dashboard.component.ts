import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie'; 
import { GlobalService } from '../../global/service/app.global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public new_customer: any = 34;
  public total_sales: any = 69;

  constructor(public _globalService: GlobalService, private _cookieService: CookieService,) { }

  ngOnInit(): void { }

}
