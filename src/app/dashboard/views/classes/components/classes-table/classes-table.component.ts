import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Classes, ClassesWithStudentsAndCourse } from '../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
import { ClassesActions } from '../../store/classes.actions';
import { selectClasses } from '../../store/classes.selectors';

@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})
export class ClassesTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'turns', 'nameCourse', 'nameStudent', 'actions'];
  classes$: Observable<ClassesWithStudentsAndCourse[]>;
 
  @Input()
  dataSource: Classes[] = [];

  @Output()
  deleteClasse = new EventEmitter<Classes>();

  @Output()
  editClasse = new EventEmitter<Classes>();


  onDeleteClasses(ClasseToDelete: Classes): void {
    this.deleteClasse.emit(ClasseToDelete);
  }

  onEditClasses(ClasseEdit: Classes): void {
    this.editClasse.emit(ClasseEdit);
  }

  public isAdmin$: Observable<boolean>;

  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.classes$ = this.store.select(selectClasses)
  }
  ngOnInit(): void {
    this.store.dispatch(ClassesActions.loadClassess())
  }
}
