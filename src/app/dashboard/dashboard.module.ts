import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from './views/users/users.module';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { appRoutingModule } from '../app-routing.module';
import { HomeModule } from './views/home/home.module';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { StudentsModule } from './views/students/students.module';
import { CoursesModule } from './views/courses/courses.module';
import { ClassesModule } from './views/classes/classes.module';


@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersModule,
    appRoutingModule,
    HomeModule,
    StudentsModule,
    CoursesModule,
    ClassesModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
