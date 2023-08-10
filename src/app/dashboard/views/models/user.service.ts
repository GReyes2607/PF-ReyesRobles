import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from '../users/models';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  loadUsers(): void {
    this._isLoading$.next(true);
    this.httpClient.get<User[]>(enviroment.baseApiUrl +'users').subscribe({
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

    const token = generateRandomString(20);

    this.httpClient.post(enviroment.baseApiUrl + 'users', {...user, token}).subscribe({
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
    this.httpClient.put(enviroment.baseApiUrl + 'users/' + id, userUpdate).subscribe({
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
    this.httpClient.delete(enviroment.baseApiUrl + 'users/' + id).subscribe({
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
