import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from '../models/user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable, Subject, map, takeUntil } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  // public users: User[] = [];
  public users: Observable<User[]>;
  public destroy = new Subject<boolean>();

  constructor(private matDialog: MatDialog, private userService: UserService, private notifier: NotifierService) {
    this.users = this.userService.getUsers();
    this.userService.loadUsers();

    // this.userService.getUsers().subscribe(
    //   {
    //     next: (user) => {
    //       this.users = user;
    //     }
    //   }
    // )
  
    // promesa que muestra un alert 
    const myEjemploPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promesa');
        // reject('Promesa Reject');
      }, 2000);
    });

    myEjemploPromise
      // promesa se cumple
      .then((valor) =>alert(valor))
      // promesa falla
      .catch((error) => alert(error))
      // finaliza se cumpla o no 
      .finally(() => { });


      const myEjemploObservable = new Observable<string>((subscribe) => {
        let obs = 'observable';
        setInterval(() => {
          if (obs === 'observable') {
            subscribe.next('ejemplo');
            obs = 'ejemplo';
          } else {
            subscribe.next('observable');
            obs = 'observable';
           subscribe.complete();
          }
        }, 2000)
      });

      myEjemploObservable.pipe(
        takeUntil(this.destroy),
        map((obs) => obs.toUpperCase())
      ).subscribe({
        next: (obs) => { alert(obs) },
        error: () => { },
        complete: () => { alert('Finalizo observable') },
      })

  }

  onCreateUser(): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent)
    dialogRef.afterClosed().subscribe({
      next: (newUser) => {
        if (newUser) {
          this.notifier.showSuccess('Usuario Creado Correctamente');
          // this.users = [
          //   ...this.users,
          //   {
          //     id: this.users.length + 1,
          //     name: newUser.name,
          //     surname: newUser.surname,
          //     email: newUser.email,
          //     password: newUser.password
          //   }
          // ]
        }

      }
    })
  }

  onDeleteUser(userDelete: User): void {
    if (confirm(`¿Esta seguro que desea eleminar a ${userDelete.name} ${userDelete.surname} ?`)) {
      this.notifier.showSuccess('Usuario eliminado correctamente');
      //this.users = this.users.filter((u) => u.id !== userDelete.id);
    }

  }

  onEditUser(userEdit: User): void {
    this.matDialog.open(UserFormDialogComponent, {
      data: userEdit
    })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.notifier.showSuccess('Usuario Modificado Correctamente');
            // this.users = this.users.map((user) => {
            //   return user.id === userEdit.id
            //     ? { ...user, ...data }
            //     : user
            // })
          }

        }
      })
  }
}
