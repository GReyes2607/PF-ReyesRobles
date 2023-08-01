import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, take, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Classes, CreateClassesData, UpdateClassesData } from '../classes/models';

const CLASSES_DB: Observable<Classes[]> = of([
  {
    id: 1,
    name: 'Clase #1245',
    turns: 'Matutino',
    nameCourse: 'Excel basico',
  },
  {
    id: 2,
    name: 'Clase #56245',
    turns: 'Vespertino',
    nameCourse: 'Excel basico',
  },
  {
    id: 3,
    name: 'Clase #57845',
    turns: 'Nocturno',
    nameCourse: 'Inteligencia emocional',
  }
]).pipe(delay(1000))

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private _classes$ = new BehaviorSubject<Classes[]>([]);
  private classes$ = this._classes$.asObservable();


  constructor(private notifier: NotifierService) { }

  loadClasses(): void {
    CLASSES_DB.subscribe({
      next: (classesDB) => this._classes$.next(classesDB)
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
    this.classes$.pipe(take(1)).subscribe({
      next: (classesActual) => {
        this._classes$.next(
          [...classesActual,
          {
            ...classes,
            id: classesActual.length + 1
          }
          ]);
        this.notifier.showSuccess('Clase Creado Correctamente');
      }
    })

  }

  updateClassesById(id: number, classesUpdate: UpdateClassesData): void {
    this.classes$.pipe(take(1)).subscribe({
      next: (classesActual) => {
        this._classes$.next(
            classesActual.map((s) =>
            s.id === id ? { ...s, ...classesUpdate } : s
          )
        );
        this.notifier.showSuccess('Clase actualizado correctamente');
      }
    });
  }

  deleteClassesById(id: number): void {
    this._classes$.pipe(take(1)).subscribe({
      next: (actual) =>
        this._classes$.next(actual.filter((classes) => classes.id !== id)),
    });
    this.notifier.showSuccess('Clase eliminado correctamente');
  }
}
