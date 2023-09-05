import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../views/users/models';
import { Store } from '@ngrx/store';
import { SelectAuthUser } from 'src/app/store/auth/auth.selector';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  currentViewName: string = '';

  @Input()
  public drawer?: MatDrawer;

  public authUser$: Observable<User | null>;

  constructor(private authService: AuthService, private store: Store, private router: Router, private activedRoute: ActivatedRoute) {
    this.authUser$ = this.store.select(SelectAuthUser);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        switch (this.getCurrentViewName(this.activedRoute.root)) {
          case 'HomeComponent': {
            this.currentViewName = 'Inicio';
            break;
          }
          case 'UsersComponent': {
            this.currentViewName = 'Usuarios';
            break;
          }
          case 'StudentsComponent': {
            this.currentViewName = 'Alumnos';
            break;
          }
          case 'CoursesComponent': {
            this.currentViewName = 'Cursos';
            break;
          }
          case 'ClassesComponent': {
            this.currentViewName = 'Inscripciones';
            break;
          }

        }
      });
  }

  private getCurrentViewName(route: ActivatedRoute): any {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.component?.name;
  }
}
