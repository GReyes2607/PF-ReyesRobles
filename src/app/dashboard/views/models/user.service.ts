import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from '../users/models';
import { BehaviorSubject, Observable, delay, of, take, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';

const USER_DB: Observable<User[]> = of([
  {
    id: 1,
    name: 'Gustavo',
    surname: 'Reyes Robles',
    email: 'gustavo_reyes@hotmail.es',
    password: '123456'
  },
  {
    id: 2,
    name: 'Juan Carlos',
    surname: 'Dominguez Gomez',
    email: 'jcdg83@gmail.com',
    password: '123456'
  }
]).pipe(delay(1000))

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();


  constructor(private notifier: NotifierService) { }

  loadUsers(): void {
    USER_DB.subscribe({
      next: (userDB) => this._users$.next(userDB)
    })

  }

  getUsers(): Observable<User[]> {
    return this.users$
  }

  getUserById(id: number): Observable<User | undefined> {
    return this._users$.pipe(
      map((users) => users.find((u) => u.id === id)),
      take(1)
    )
  }


  createUser(user: CreateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (usuariosActuales) => {
        this._users$.next(
          [...usuariosActuales,
          {
            ...user,
            id: usuariosActuales.length + 1
          }
          ]);
        this.notifier.showSuccess('Usuario Creado Correctamente');
      }
    })

  }

  updateUserById(id: number, userUpdate: UpdateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (actual) => {
        this._users$.next(
          actual.map((u) =>
            u.id === id ? { ...u, ...userUpdate } : u
          )
        );
        this.notifier.showSuccess('Usuario actualizado correctamente');
      }
    });
  }

  deleteUserById(id: number): void {
    this._users$.pipe(take(1)).subscribe({
      next: (actual) =>
        this._users$.next(actual.filter((user) => user.id !== id)),
    });
    this.notifier.showSuccess('Usuario eliminado correctamente');
  }
}
