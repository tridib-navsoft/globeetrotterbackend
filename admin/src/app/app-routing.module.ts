import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./global/service/auth-guard.service";
import { NotfoundComponent } from "./app.notfound.component";
import { LoginComponent } from "./main-component/app.login.component";
import { ForgotPasswordComponent } from "./main-component/app.forgotpass.component";
import { ResetPasswordComponent } from "./main-component/app.resetpass.component";
import { VerifyCodeComponent } from "./main-component/app.verifyCode.component";
import { UpdatePasswordComponent } from "./main-component/app.updatePwd.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LoginComponent,
    data: { title: "Login", is_login: 1 },
  },
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login", is_login: 1 },
  },
  {
    path: "forgot_password",
    component: ForgotPasswordComponent,
    data: { title: "Forgot Password", is_login: 1 },
  },
  {
    path: "reset_password",
    component: ResetPasswordComponent,
    data: { title: "Reset Password", is_login: 1 },
  },
  {
    path: "verify_code",
    component: VerifyCodeComponent,
    data: { title: "Forgot Password", is_login: 1 },
  },
    ////////DASHBOARD//////////////////
    {
      path: "dashboard",
      data: { title: "Dashboard", is_login: 0, state: "dashboard" },
      canActivateChild: [AuthGuard],
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    ////////Colleges//////////////////
    {
      path: "colleges",
      data: { title: "Colleges", is_login: 0, state: "colleges" },
      canActivateChild: [AuthGuard],
      loadChildren: () => import('./colleges/colleges.module').then(m => m.CollegesModule)
    },
    ////////Recruiters//////////////////
    {
      path: "recruiters",
      data: { title: "Recruiters", is_login: 0, state: "recruiters" },
      canActivateChild: [AuthGuard],
      loadChildren: () => import('./recruiters/recruiters.module').then(m => m.RecruitersModule)
    },
  
  
    /////////404/////////////////
    { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [
  NotfoundComponent,
  LoginComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  VerifyCodeComponent,
  UpdatePasswordComponent,
];
