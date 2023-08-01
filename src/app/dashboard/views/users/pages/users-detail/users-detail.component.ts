import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { User } from '../../models/index';
import { UserService } from '../../../models/user.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styles: [
  ]
})
export class UsersDetailComponent {
  public userId?: number;
  public usuario: User | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notifier: NotifierService,
    private userService: UserService
  ) {

    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.notifier.getError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido!!!`)
      this.router.navigate(['dashboard', 'users']);
    } else {
      this.userId = Number(this.activatedRoute.snapshot.params['id']);
      this.loadUser();
    }
  }

  loadUser(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: ((user) => {
          this.usuario = user
        })
      })
    }
  }
}


