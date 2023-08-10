import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Courses, CreateCourseData, UpdateCourseData } from '../courses/models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _courses$ = new BehaviorSubject<Courses[]>([]);
  private courses$ = this._courses$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();


  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  loadCourses(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Courses[]>(enviroment.baseApiUrl + 'courses').subscribe({
      next: (response) => {
        this._courses$.next(response);
      },
      error: () => {
        this.notifier.getError('Error al cargar Cursos');
      },
      complete: () => {
        this._isLoading$.next(false);
      }
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
    this.httpClient.post(enviroment.baseApiUrl + 'courses', courses).subscribe({
      next: () => {
        this.notifier.showSuccess('Curso Creado Correctamente');
        this.loadCourses();
      },
      error: () => {
        this.notifier.getError('Error al crear un curso');
      }
    })

  }

  updateCourseById(id: number, courseUpdate: UpdateCourseData): void {
    this.httpClient.put(enviroment.baseApiUrl + 'courses/' + id, courseUpdate).subscribe({
      next: () => {
          this.notifier.showSuccess('Curso actualizado correctamente');
          this.loadCourses();
      }, 
      error: () => {
        this.notifier.getError('Error al actualizar el Curso')
      }
    })
  }

  deleteCourseById(id: number): void {
    this.httpClient.delete(enviroment.baseApiUrl + 'courses/' + id).subscribe({
      next: () => {
          this.notifier.showSuccess('Curso eliminado correctamente');
          this.loadCourses();
      },
      error: () => {
        this.notifier.getError('Error al eliminar el Curso')
      }
    })
  }
}
