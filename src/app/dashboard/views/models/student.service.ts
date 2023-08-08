import { Injectable } from '@angular/core';
import { CreateStudentData, UpdateStudentData, Student } from '../students/models';
import { BehaviorSubject, Observable, delay, of, take, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  loadStudents(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Student[]>('http://localhost:3000/students').subscribe({
      next: (response) => {
        this._students$.next(response);
      },
      error: () => {
        this.notifier.getError('Error al cargar alumnos');
      },
      complete: () => {
        this._isLoading$.next(false);
      }
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
    this.httpClient.post('http://localhost:3000/students', student).subscribe({
      next: () => {
        this.notifier.showSuccess('Alumno Creado Correctamente');
        this.loadStudents();
      },
      error: () => {
        this.notifier.getError('Error al crear un alumno');
      }
    })
  }

  updateStudentById(id: number, studentUpdate: UpdateStudentData): void {
    this.httpClient.put('http://localhost:3000/students/' + id, studentUpdate).subscribe({
      next: () => {
          this.notifier.showSuccess('Alumno actualizado correctamente');
          this.loadStudents();
      }, 
      error: () => {
        this.notifier.getError('Error al actualizar el Alumno')
      }
    })
  }

  deleteStudentById(id: number): void {
    this.httpClient.delete('http://localhost:3000/students/' + id).subscribe({
      next: () => {
          this.notifier.showSuccess('Alumno eliminado correctamente');
          this.loadStudents();
      },
      error: () => {
        this.notifier.getError('Error al eliminar el Alumno')
      }
    })
  }
}
