import { Injectable } from '@angular/core';
import { LoginData } from './models';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User } from '../dashboard/views/users/models';
import { NotifierService } from '../core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth/auth.action';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private notifier: NotifierService, private router: Router, private httpClient: HttpClient, private store: Store) { }

    isAuthenticated(): Observable<boolean> {
        return this.httpClient.get<User[]>(enviroment.baseApiUrl + 'users', {
            params: {
                token: localStorage.getItem('token') || '',
            }
        }).pipe(map((usersResult) => {

            if (usersResult.length) {
                const authUser = usersResult[0];

                this.store.dispatch(AuthActions.setAuthUser({ data: authUser }));
            }
            return !!usersResult.length
        })
        )
    }

    login(data: LoginData): void {
        this.httpClient.get<User[]>(enviroment.baseApiUrl + 'users', {
            params: {
                email: data.email || '',
                password: data.password || ''
            }
        }).subscribe({
            next: (response) => {
                if (response.length) {
                    const authUser = response[0];
                    // this._authUser$.next(authUser);
                    this.store.dispatch(AuthActions.setAuthUser({ data: authUser }));
                    this.router.navigate(['/dashboard']);
                    localStorage.setItem('token', authUser.token);
                } else {
                    // this._authUser$.next(null);
                    this.notifier.getError('Email o contraseña invalido');

                    this.store.dispatch(AuthActions.setAuthUser({ data: null }));
                }
            },
            error: (e) => {
                if (e instanceof HttpErrorResponse) {
                    this.notifier.getError('ocurrio un error inesperado');
                }
            }
        })
    }

    public logout(): void {
        this.store.dispatch(AuthActions.setAuthUser({ data: null }))
    }
}