import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruitersRoutingModule } from './recruiters-routing.module';
import { GlobeeCommonModule } from '../globee.common.module';
import { RecruitersComponent } from './recruiters.component';

@NgModule({
  declarations: [
    RecruitersComponent
  ],
  imports: [
    CommonModule,
    RecruitersRoutingModule,
    GlobeeCommonModule
  ],
  entryComponents: [
    RecruitersComponent
  ]
})
export class RecruitersModule { }
