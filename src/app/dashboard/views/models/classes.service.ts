import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, take, map, Subscription } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Classes, ClassesWithStudentsAndCourse, CreateClassesData, UpdateClassesData } from '../classes/models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { ofType } from '@ngrx/effects';


@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private _classes$ = new BehaviorSubject<ClassesWithStudentsAndCourse[]>([]);
  private classes$ = this._classes$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();


  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  loadClasses(): void {
    this._isLoading$.next(true);
    this.httpClient.get<ClassesWithStudentsAndCourse[]>(enviroment.baseApiUrl + 'classes?_expand=student&_expand=course').subscribe({
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

  getClasses(): Observable<ClassesWithStudentsAndCourse[]> {
    return this.classes$
  }

  getClassesById(id: number): Observable<ClassesWithStudentsAndCourse | undefined> {
    return this._classes$.pipe(
      map((classes) => classes.find((c) => c.id === id)),
      take(1)
    )
  }


  createClasses(classes: CreateClassesData): void {
  this.httpClient.post(enviroment.baseApiUrl + 'classes', classes).subscribe({
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
  this.httpClient.put(enviroment.baseApiUrl + 'classes/' + id, classesUpdate).subscribe({
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
  this.httpClient.delete(enviroment.baseApiUrl + 'classes/' + id).subscribe({
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
