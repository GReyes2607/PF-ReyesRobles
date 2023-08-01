import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { ClassesTableComponent } from './components/classes-table/classes-table.component';
import { ClassesFormDialogComponent } from './components/classes-form-dialog/classes-form-dialog.component';
import { ClassesDetailComponent } from './pages/classes-detail/classes-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    ClassesComponent,
    ClassesTableComponent,
    ClassesFormDialogComponent,
    ClassesDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink
  ]
})
export class ClassesModule { }
