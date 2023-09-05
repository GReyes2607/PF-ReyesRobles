import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { ClassesTableComponent } from './components/classes-table/classes-table.component';
import { ClassesFormDialogComponent } from './components/classes-form-dialog/classes-form-dialog.component';
import { ClassesDetailComponent } from './pages/classes-detail/classes-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterLink, RouterModule } from '@angular/router';
import { ClassesRoutingModule } from './classes-routing.module';
import { DashboardRoutingModule } from '../../dashboard-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { ClassesEffects } from './store/classes.effects';
import { StoreModule } from '@ngrx/store';
import { classesFeature } from './store/classes.reducer';



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
    RouterLink,
    ClassesRoutingModule,
    StoreModule.forFeature(classesFeature),
    EffectsModule.forFeature([ClassesEffects]),
  ]
})
export class ClassesModule { }
