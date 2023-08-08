import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

@NgModule({
    imports: [
        RouterModule.forChild([
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
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }