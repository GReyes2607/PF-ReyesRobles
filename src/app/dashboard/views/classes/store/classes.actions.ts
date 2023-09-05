import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Classes, ClassesWithStudentsAndCourse, CreateClassesData } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';

export const ClassesActions = createActionGroup({
  source: 'Classes',
  events: {
    'Load Classess': emptyProps(),
    'Load Classess Success': props<{ data: ClassesWithStudentsAndCourse[] }>(),
    'Load Classess Failure': props<{ error: HttpErrorResponse }>(),

    'Load Courses Option': emptyProps(),
    'Load Courses Option Success': props<{ data: Course[] }>(),
    'Load Courses Option Failure': props<{ error: HttpErrorResponse }>(),

    'Load Students Option': emptyProps(),
    'Load Students Option Success': props<{ data: Student[] }>(),
    'Load Students Option Failure': props<{ error: HttpErrorResponse }>(),

    'Create Classes': props<{ payload: CreateClassesData }>(),
    'Create Classe Success': props<{ data: Classes}>(),
    'Create Classe Failure': props<{ error: HttpErrorResponse }>(),
  }
});
