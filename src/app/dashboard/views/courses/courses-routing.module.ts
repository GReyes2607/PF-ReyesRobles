import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CoursesDetailComponent } from './pages/courses-detail/courses-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([

            {
                path: '',
                component: CoursesComponent
            },
            {
                path: ':id',
                component: CoursesDetailComponent
            }

        ])
    ],
    exports: [RouterModule]

})
export class CoursesRoutingModule { }