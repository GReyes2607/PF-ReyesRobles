import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from '../models/user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public users: Observable<User[]>;
  public destroy = new Subject<boolean>();

  constructor(private matDialog: MatDialog, private userService: UserService, private notifier: NotifierService) {
    this.userService.loadUsers();
    this.users = this.userService.getUsers();

  }

  onCreateUser(): void {
    this.matDialog.open(UserFormDialogComponent)
      .afterClosed().subscribe({
        next: (newUser) => {
          if (newUser) {
            this.userService.createUser({
              name: newUser.name,
              surname: newUser.surname,
              email: newUser.email,
              password: newUser.password
            })
          }
        }
      })
  }

  onDeleteUser(userDelete: User): void {
    if (confirm(`¿Esta seguro que desea eleminar a ${userDelete.name} ${userDelete.surname} ?`)) {
      this.userService.deleteUserById(userDelete.id);
    }

  }

  onEditUser(userEdit: User): void {
    this.matDialog.open(UserFormDialogComponent, {
      data: userEdit
    })
      .afterClosed()
      .subscribe({
        next: (dataEdit) => {
          if (dataEdit) {
            this.userService.updateUserById(userEdit.id, dataEdit)
          }

        }
      })
  }
}
