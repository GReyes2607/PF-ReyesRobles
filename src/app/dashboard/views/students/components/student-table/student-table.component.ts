import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {

  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];

  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<Student>();

  @Output()
  editStudent = new EventEmitter<Student>();

  onDeleteStudent(StudentToDelete: Student): void{
    this.deleteStudent.emit(StudentToDelete);
  }

  onEditStudent(StudentEdit: Student): void {
    this.editStudent.emit(StudentEdit);
  }

  public isAdmin$: Observable<boolean>;

  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

}
