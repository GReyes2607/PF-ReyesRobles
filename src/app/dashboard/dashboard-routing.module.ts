import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UsersComponent } from './views/users/users.component';
import { UsersDetailComponent } from './views/users/pages/users-detail/users-detail.component';
import { adminGuard } from '../core/guards/admin.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'users',
                canActivate: [adminGuard],
                children: [
                    {
                        path: '',
                        component: UsersComponent,
                    },
                    {
                        path: ':id',
                        component: UsersDetailComponent,
                    }
                ]
                //loadChildren: () => import('./views/users/users.module').then((m) => m.UsersModule),
            },
            {
                path: 'students',
                loadChildren: () => import('./views/students/students.module').then((m) => m.StudentsModule),
            },
            {
                path: 'courses',
                loadChildren: () => import('./views/courses/courses.module').then((m) => m.CoursesModule),
            },
            {
                path: 'classes',
                loadChildren: () => import('./views/classes/classes.module').then((m) => m.ClassesModule),
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule { }