import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [ {
  path: '',
  component: NewUserComponent
} ];

@NgModule( {
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  declarations: [ NewUserComponent ]
} )
export class UsersRoutingModule {}
