import { Injectable } from '@angular/core';
import { LoginData } from './models';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User } from '../dashboard/views/users/models';
import { NotifierService } from '../core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private _authUser$ = new BehaviorSubject<User | null>(null);
    public authUser$ = this._authUser$.asObservable();

    constructor(private notifier: NotifierService, private router: Router, private httpClient: HttpClient) { }

    isAuthenticated(): Observable<boolean> {
        return this.httpClient.get<User[]>(enviroment.baseApiUrl + 'users', {
            params: {
                token: localStorage.getItem('token') || '',
            }
        }).pipe(map((usersResult) => {
            return !!usersResult.length
        })
        )
    }

    login(data: LoginData): void {
        this.httpClient.get<User[]>(enviroment.baseApiUrl +  'users', {
            params: {
                email: data.email || '',
                password: data.password || ''
            }
        }).subscribe({
            next: (response) => {
                if (response.length) {
                    const authUser = response[0];
                    this._authUser$.next(authUser);
                    this.router.navigate(['/dashboard']);
                    localStorage.setItem('token', authUser.token);
                } else {
                    this._authUser$.next(null);
                    this.notifier.getError('Email o contraseña invalido');
                }
            },
            error: (e) => {
                if (e instanceof HttpErrorResponse) {
                    this.notifier.getError('ocurrio un error inesperado');
                }
            }
        })
    }
}