import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Classes } from './models';
import { MatDialog } from '@angular/material/dialog';
import { ClassesService } from '../models/classes.service';
import { ClassesFormDialogComponent } from './components/classes-form-dialog/classes-form-dialog.component';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent {
  public classes: Observable<Classes[]>;
  public isLoading$: Observable<boolean>;
  public destroy = new Subject<boolean>();

  public isAdmin$: Observable<boolean>;

  constructor(private matDialog: MatDialog, private classesService: ClassesService, private store: Store) {
    this.classesService.loadClasses();
    this.isLoading$ = classesService.isLoading$;
    this.classes = this.classesService.getClasses();
    this.isAdmin$ = this.store.select(selectIsAdmin);

  }

  onCreateClasses(): void {
    this.matDialog.open(ClassesFormDialogComponent)
      .afterClosed().subscribe({
        next: (newClasse) => {
          if (newClasse) {
            this.classesService.createClasses({
              name: newClasse.name,
              turns: newClasse.turns,
              courseId: newClasse.courseId,
              studentId: newClasse.studentId
            })
          }
        }
      })
  }

  onDeleteClasses(classesDelete: Classes): void {
    if (confirm(`¿Esta seguro que desea eliminar la clase ${classesDelete.name} ?`)) {
      this.classesService.deleteClassesById(classesDelete.id);
    }

  }

  onEditClasses(classesEdit: Classes): void {
    this.matDialog.open(ClassesFormDialogComponent, {
      data: classesEdit
    })
      .afterClosed()
      .subscribe({
        next: (dataEdit) => {
          if (dataEdit) {
            this.classesService.updateClassesById(classesEdit.id, dataEdit)
          }

        }
      })
  }
}
