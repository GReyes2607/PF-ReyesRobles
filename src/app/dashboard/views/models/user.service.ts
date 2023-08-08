import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from '../users/models';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  loadUsers(): void {
    this._isLoading$.next(true);
    this.httpClient.get<User[]>('http://localhost:3000/users').subscribe({
      next: (response) => {
        this._users$.next(response)
      },
      error: () => {
        this.notifier.getError('Error al cargar Usuarios');
      },
      complete: () => {
        this._isLoading$.next(false);
      },
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
    this.httpClient.post('http://localhost:3000/users', user).subscribe({
      next: () => {
        this.notifier.showSuccess('Usuario Creado Correctamente');
        this.loadUsers();
      },
      error: () => {
        this.notifier.getError('Error al crear');
      },

    })
  }

  updateUserById(id: number, userUpdate: UpdateUserData): void {
    this.httpClient.put('http://localhost:3000/users/' + id, userUpdate).subscribe({
      next: () => {
          this.notifier.showSuccess('Usuario actualizado correctamente');
          this.loadUsers();
      }, 
      error: () => {
        this.notifier.getError('Error al actualizar el usuario')
      }
    })
  }

  deleteUserById(id: number): void {
    this.httpClient.delete('http://localhost:3000/users/' + id).subscribe({
      next: () => {
          this.notifier.showSuccess('Usuario eliminado correctamente');
          this.loadUsers();
      },
      error: () => {
        this.notifier.getError('Error al eliminar el usuario')
      }
    })
  }
}
