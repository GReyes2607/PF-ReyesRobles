import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { StudentsDetailComponent } from './pages/students-detail/students-detail.component';
import { RouterModule } from '@angular/router';
import { StudentsRoutingModule } from './students-routing.module';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentTableComponent,
    StudentFormDialogComponent,
    StudentsDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
