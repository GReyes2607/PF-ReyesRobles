import { Injectable } from '@angular/core';
import { CreateStudentData, UpdateStudentData, Student } from '../students/models';
import { BehaviorSubject, Observable, delay, of, take, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';

const STUDENT_DB: Observable<Student[]> = of([
  {
    id: 1,
    name: 'Gustavo',
    surname: 'Reyes Robles',
    email: 'gustavo_reyes@hotmail.es'
  },
  {
    id: 2,
    name: 'Juan Carlos',
    surname: 'Dominguez Gomez',
    email: 'jcdg83@gmail.com'
  }
]).pipe(delay(1000))

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();


  constructor(private notifier: NotifierService) { }

  loadStudents(): void {
    STUDENT_DB.subscribe({
      next: (studentDB) => this._students$.next(studentDB)
    })

  }

  getStudents(): Observable<Student[]> {
    return this.students$
  }

  getStudentById(id: number): Observable<Student | undefined> {
    return this._students$.pipe(
      map((students) => students.find((s) => s.id === id)),
      take(1)
    )
  }


  createStudent(student: CreateStudentData): void {
    this.students$.pipe(take(1)).subscribe({
      next: (studentActual) => {
        this._students$.next(
          [...studentActual,
          {
            ...student,
            id: studentActual.length + 1
          }
          ]);
        this.notifier.showSuccess('Alumno Creado Correctamente');
      }
    })

  }

  updateStudentById(id: number, studentUpdate: UpdateStudentData): void {
    this.students$.pipe(take(1)).subscribe({
      next: (studentactual) => {
        this._students$.next(
            studentactual.map((s) =>
            s.id === id ? { ...s, ...studentUpdate } : s
          )
        );
        this.notifier.showSuccess('Alumno actualizado correctamente');
      }
    });
  }

  deleteStudentById(id: number): void {
    this._students$.pipe(take(1)).subscribe({
      next: (actual) =>
        this._students$.next(actual.filter((student) => student.id !== id)),
    });
    this.notifier.showSuccess('Usuario eliminado correctamente');
  }
}
