import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthComponent } from "./auth/auth.component";
import { HomeComponent } from "./dashboard/views/home/home.component";
import { UsersComponent } from "./dashboard/views/users/users.component";
import { UsersDetailComponent } from "./dashboard/views/users/pages/users-detail/users-detail.component";
import { LoginComponent } from "./auth/views/login/login.component";
import { RegisterComponent } from "./auth/views/register/register.component";
import { StudentsComponent } from "./dashboard/views/students/students.component";
import { StudentsDetailComponent } from "./dashboard/views/students/pages/students-detail/students-detail.component";
import { CoursesComponent } from './dashboard/views/courses/courses.component';
import { CoursesDetailComponent } from './dashboard/views/courses/pages/courses-detail/courses-detail.component';
import { ClassesComponent } from './dashboard/views/classes/classes.component';
import { ClassesDetailComponent } from './dashboard/views/classes/pages/classes-detail/classes-detail.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'users',
                children: [
                    {
                        path: '',
                        component: UsersComponent
                    },
                    {
                        path: ':id',
                        component: UsersDetailComponent
                    }
                ]
            },
            {
                path: 'students',
                children: [
                    {
                        path: '',
                        component: StudentsComponent
                    },
                    {
                        path: ':id',
                        component: StudentsDetailComponent
                    }
                ]
            },
            {
                path: 'courses',
                children: [
                    {
                        path: '',
                        component: CoursesComponent
                    },
                    {
                        path: ':id',
                        component: CoursesDetailComponent
                    }

                ]
            },
            {
                path: 'classes',
                children: [
                    {
                        path: '',
                        component: ClassesComponent
                    },
                    {
                        path: ':id',
                        component: ClassesDetailComponent
                    }
                ]
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/auth/login',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class appRoutingModule { }