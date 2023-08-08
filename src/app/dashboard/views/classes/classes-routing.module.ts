import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClassesComponent } from './classes.component';
import { ClassesDetailComponent } from './pages/classes-detail/classes-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ClassesComponent
            },
            {
                path: ':id',
                component: ClassesDetailComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class ClassesRoutingModule { }