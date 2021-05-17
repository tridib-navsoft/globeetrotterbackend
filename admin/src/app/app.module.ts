import { NgModule, enableProdMode, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobeeCommonModule } from './globee.common.module';
import { MatIconModule } from '@angular/material/icon';

import { DatePipe } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule  } from '@angular/common/http';
import { CookieService, CookieModule } from 'ngx-cookie';
// import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { HeaderComponent } from './partial-component/app.header.component';
import { LeftMenuComponent } from './partial-component/app.leftmenu.component';
import { FooterComponent } from './partial-component/app.footer.component';
import { TabsComponent } from './partial-component/app.tabs.component';
// import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { GlobalService } from './global/service/app.global.service';
import { AuthGuard } from './global/service/auth-guard.service';
import { AccountDetailsComponent, PasswordUpdateComponent } from './profile/app.profile.component';
import { Global } from './global/service/global';


if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@NgModule({
  imports: [
	RouterModule,
	AppRoutingModule,
	BrowserModule,
	BrowserAnimationsModule,
	HttpClientModule,
	GlobeeCommonModule,//For all common modules
	MatIconModule,
	CookieModule.forRoot(),
	HttpClientJsonpModule

	// ChartsModule,
	// NgxDaterangepickerMd,
	// Use fcRoot function to inject FusionCharts library, and the modules you want to use
	// FusionChartsModule,
  ],
  declarations: [
	AppComponent,
	routedComponents,
	HeaderComponent,
	LeftMenuComponent,
	FooterComponent,
	TabsComponent,
	AccountDetailsComponent,
	PasswordUpdateComponent
	],
  bootstrap: [AppComponent],
  providers: [CookieService, 
  //DialogsService,
  GlobalService, AuthGuard,
   DatePipe,
   Global
  ],
  entryComponents: [
	AccountDetailsComponent,
	PasswordUpdateComponent,
	
  ],
  exports: [
	//ConfirmDialog, AlertDialog,
	],
})
export class AppModule { }