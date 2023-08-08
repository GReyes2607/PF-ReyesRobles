import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentsDetailComponent } from './pages/students-detail/students-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: StudentsComponent
            },
            {
                path: ':id',
                component: StudentsDetailComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class StudentsRoutingModule { }