import { Component } from '@angular/core';
import { Classes, ClassesWithStudentsAndCourse } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ClassesService } from '../../../models/classes.service';

@Component({
  selector: 'app-classes-detail',
  templateUrl: './classes-detail.component.html',
  styles: [
  ]
})
export class ClassesDetailComponent {
  public classesId?: number;
  public classes: ClassesWithStudentsAndCourse | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notifier: NotifierService,
    private classesService: ClassesService
  ) {

    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.notifier.getError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido!!!`)
      this.router.navigate(['dashboard', 'classes']);
    } else {
      this.classesId = Number(this.activatedRoute.snapshot.params['id']);
      this.loadClasse();
    }
  }

  loadClasse(): void {
    if (this.classesId) {
      this.classesService.getClassesById(this.classesId).subscribe({
        next: ((classe) => {
          this.classes = classe
        })
      })
    }
  }
}
