import { Injectable } from '@angular/core';
import { User } from '../users/models';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
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
  ];

  private users$ = new BehaviorSubject<User[]>([])

  constructor() { }

  loadUsers(): void {
    this.users$.next(this.users);
  }
  
  getUsers(): Subject<User[]> {
    // return this.users
    return this.users$
  }
}
