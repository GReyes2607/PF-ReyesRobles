import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, take, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Classes, CreateClassesData, UpdateClassesData } from '../classes/models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';


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
    this.httpClient.get<Classes[]>(enviroment.baseApiUrl + 'classes').subscribe({
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
    this.httpClient.put( enviroment.baseApiUrl + 'classes/' + id, classesUpdate).subscribe({
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
