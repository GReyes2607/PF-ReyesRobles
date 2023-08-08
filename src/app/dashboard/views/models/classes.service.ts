import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, take, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Classes, CreateClassesData, UpdateClassesData } from '../classes/models';
import { HttpClient } from '@angular/common/http';

// const CLASSES_DB: Observable<Classes[]> = of([
//   {
//     id: 1,
//     name: 'Clase #1245',
//     turns: 'Matutino',
//     nameCourse: 'Excel basico',
//   },
//   {
//     id: 2,
//     name: 'Clase #56245',
//     turns: 'Vespertino',
//     nameCourse: 'Excel basico',
//   },
//   {
//     id: 3,
//     name: 'Clase #57845',
//     turns: 'Nocturno',
//     nameCourse: 'Inteligencia emocional',
//   }
// ]).pipe(delay(1000))

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private _classes$ = new BehaviorSubject<Classes[]>([]);
  private classes$ = this._classes$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();


  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  loadClasses(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Classes[]>('http://localhost:3000/classes').subscribe({
      next: (response) => {
        this._classes$.next(response);
      },
      error: () => {
        this.notifier.getError('Error al cargar las Clases');
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })

  }

  getClasses(): Observable<Classes[]> {
    return this.classes$
  }

  getClassesById(id: number): Observable<Classes | undefined> {
    return this._classes$.pipe(
      map((classes) => classes.find((c) => c.id === id)),
      take(1)
    )
  }


  createClasses(classes: CreateClassesData): void {
    this.httpClient.post('http://localhost:3000/classes', classes).subscribe({
      next: () => {
        this.notifier.showSuccess('Clase Creada Correctamente');
        this.loadClasses();
      },
      error: () => {
        this.notifier.getError('Error al crear una clase');
      }
    })

  }

  updateClassesById(id: number, classesUpdate: UpdateClassesData): void {
    this.httpClient.put('http://localhost:3000/classes/' + id, classesUpdate).subscribe({
      next: () => {
          this.notifier.showSuccess('Clase actualizada correctamente');
          this.loadClasses();
      }, 
      error: () => {
        this.notifier.getError('Error al actualizar la clase')
      }
    })
  }

  deleteClassesById(id: number): void {
    this.httpClient.delete('http://localhost:3000/classes/' + id).subscribe({
      next: () => {
          this.notifier.showSuccess('Clase eliminada correctamente');
          this.loadClasses();
      },
      error: () => {
        this.notifier.getError('Error al eliminar la clase')
      }
    })
  }
}
