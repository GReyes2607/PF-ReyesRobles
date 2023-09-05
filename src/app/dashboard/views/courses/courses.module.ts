import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterLink, RouterModule } from '@angular/router';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CoursesDetailComponent } from './pages/courses-detail/courses-detail.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseTableComponent,
    CourseFormDialogComponent,
    CoursesDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink,
    RouterModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
