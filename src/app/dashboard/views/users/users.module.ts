import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UsersDetailComponent } from './pages/users-detail/users-detail.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from '../../dashboard-routing.module';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    UsersComponent,
    UserFormDialogComponent,
    UserTableComponent,
    UsersDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    DashboardRoutingModule
    //UsersRoutingModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
