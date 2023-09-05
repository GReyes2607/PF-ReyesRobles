import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ClassesActions } from './classes.actions';
import { HttpClient } from '@angular/common/http';
import { Classes, ClassesWithStudentsAndCourse, CreateClassesData } from '../models';
import { ClassesService } from '../../models/classes.service';
import { CourseService } from '../../models/courses.service';
import { StudentService } from '../../models/student.service';
import { Course } from '../../courses/models';
import { enviroment } from 'src/enviroments/enviroment';
import { Student } from '../../students/models';
import { Store } from '@ngrx/store';


@Injectable()
export class ClassesEffects {

  loadClassess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClassesActions.loadClassess),
      concatMap(() =>
        this.getClassesFromDB().pipe(
          map(data => ClassesActions.loadClassessSuccess({ data })),
          catchError(error => of(ClassesActions.loadClassessFailure({ error }))))
      )
    );
  });

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClassesActions.loadCoursesOption),
      concatMap(() =>
        this.getCoursesOptions().pipe(
          map(data => ClassesActions.loadCoursesOptionSuccess({ data })),
          catchError(error => of(ClassesActions.loadCoursesOptionFailure({ error }))))
      )
    );
  });

  loadStudentOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClassesActions.loadStudentsOption),
      concatMap(() =>
        this.getStudentsOptions().pipe(
          map(data => ClassesActions.loadStudentsOptionSuccess({ data })),
          catchError(error => of(ClassesActions.loadStudentsOptionFailure({ error }))))
      )
    );
  });

  createClasses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClassesActions.createClasses),
      concatMap((action) =>
        this.createClasse(action.payload).pipe(
          map(data => ClassesActions.createClasseSuccess({ data })),
          catchError(error => of(ClassesActions.createClasseFailure({ error }))))
      )
    );
  });

  createClassesSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClassesActions.createClasseSuccess),
      map(() => this.store.dispatch(ClassesActions.loadClassess()))
    );
  }, {dispatch: false});

  constructor(private actions$: Actions, private service: ClassesService, private httpClient: HttpClient, private store: Store) { }
  
  private getClassesFromDB(): Observable<ClassesWithStudentsAndCourse[]> {
    return this.httpClient.get<ClassesWithStudentsAndCourse[]>(enviroment.baseApiUrl + 'classes?_expand=student&_expand=course')
  }
  
  private getCoursesOptions(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(enviroment.baseApiUrl + 'courses')
  }
  private getStudentsOptions(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(enviroment.baseApiUrl + 'students')
  }
   private createClasse(payload: CreateClassesData): Observable<Classes> {
    return this.httpClient.post<Classes>(enviroment.baseApiUrl + 'classes', payload)
   }

} 