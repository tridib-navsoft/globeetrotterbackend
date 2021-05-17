import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollegesComponent } from './colleges.component';
import { CollegesAddEditComponent } from './colleges.add.edit.component';

const routes: Routes = [
  { path: '', component: CollegesComponent },
  { path: 'add', component: CollegesAddEditComponent },
  { path: 'edit/:id', component: CollegesAddEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollegesRoutingModule { }
