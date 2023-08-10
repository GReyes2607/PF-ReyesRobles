import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { UsersComponent } from "./users.component";
import { UsersDetailComponent } from "./pages/users-detail/users-detail.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: UsersComponent,
            },
            {
                path: ':id',
                component: UsersDetailComponent,
            }
        ])
    ],
    exports: [RouterModule],
})
export class UsersRoutingModule { }