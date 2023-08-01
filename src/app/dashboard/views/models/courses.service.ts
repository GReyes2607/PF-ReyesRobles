import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, take, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Courses, CreateCourseData, UpdateCourseData } from '../courses/models';

const COURSES_DB: Observable<Courses[]> = of([
  {
    id: 1,
    name: 'Excel Basico',
    type: 'Virtual',
    instructorName: 'Juan Perez',
  },
  {
    id: 2,
    name: 'Inteligencia emocional',
    type: 'Presencial',
    instructorName: 'Roman Martinez',
  }
]).pipe(delay(1000))

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _courses$ = new BehaviorSubject<Courses[]>([]);
  private courses$ = this._courses$.asObservable();


  constructor(private notifier: NotifierService) { }

  loadCourses(): void {
    COURSES_DB.subscribe({
      next: (coursesDB) => this._courses$.next(coursesDB)
    })

  }

  getCourses(): Observable<Courses[]> {
    return this.courses$
  }

  getCoursesById(id: number): Observable<Courses | undefined> {
    return this._courses$.pipe(
      map((courses) => courses.find((c) => c.id === id)),
      take(1)
    )
  }


  createCourse(courses: CreateCourseData): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (coursesActual) => {
        this._courses$.next(
          [...coursesActual,
          {
            ...courses,
            id: coursesActual.length + 1
          }
          ]);
        this.notifier.showSuccess('Curso Creado Correctamente');
      }
    })

  }

  updateCourseById(id: number, courseUpdate: UpdateCourseData): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (coursesActual) => {
        this._courses$.next(
            coursesActual.map((s) =>
            s.id === id ? { ...s, ...courseUpdate } : s
          )
        );
        this.notifier.showSuccess('Curso actualizado correctamente');
      }
    });
  }

  deleteCourseById(id: number): void {
    this._courses$.pipe(take(1)).subscribe({
      next: (actual) =>
        this._courses$.next(actual.filter((courses) => courses.id !== id)),
    });
    this.notifier.showSuccess('Curso eliminado correctamente');
  }
}
