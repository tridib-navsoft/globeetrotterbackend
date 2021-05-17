import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollegesRoutingModule } from './colleges-routing.module';
import { GlobeeCommonModule } from '../globee.common.module';
import { CollegesComponent } from './colleges.component';
import { CollegesAddEditComponent } from './colleges.add.edit.component';

@NgModule({
  declarations: [
    CollegesComponent,
    CollegesAddEditComponent
  ],
  imports: [
    CommonModule,
    CollegesRoutingModule,
    GlobeeCommonModule
  ],
  entryComponents: [
    CollegesComponent
  ]
})
export class CollegesModule { }
